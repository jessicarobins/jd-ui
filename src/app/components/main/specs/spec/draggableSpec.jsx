import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

var SpecComponent = require('./spec2.component.jsx');

const source = {
  beginDrag(props) {
    var children = props.children(props.index)
    return {
      id: props.spec.id,
      index: props.index,
      childIds: _.map(children, 'id'),
      currentIndent: props.currentIndent
    };
  },
  
  isDragging(props, monitor) {
    var childIds = monitor.getItem().childIds
    return props.spec.id === monitor.getItem().id ||
      _.contains(childIds, props.spec.id)
  }
};

const target = {
  hover(props, monitor, component) {
    const threshold = 50;
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    
    // if it's in the same place, that means we could be
    //  trying to change the depth
    //  look to see where the hover bounding rect is
    //    if it's to the left of the item a certain amount,
    //      (40px) try to unindent
    //    if it's to the right a certain amount, try to
    //      indent
    if (dragIndex === hoverIndex) {
      //get difference
      const difference = _.round(monitor.getDifferenceFromInitialOffset().x/threshold);
      const currentIndent = monitor.getItem().currentIndent;
      console.log(difference)
      //only perform move when we are threshold to right or left
      // of item left
      
      if(difference === currentIndent){
        return;
      }
      
      if(difference > currentIndent){
        props.tryChangeDepth(dragIndex, 1)
        monitor.getItem().currentIndent+=1;
        return;
      } 
      
      if(difference < currentIndent) {
        props.tryChangeDepth(dragIndex, -1)
        monitor.getItem().currentIndent-=1;
        return;
      }
    
      return;
    }
    
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    const moved = props.move(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    if(moved){
      monitor.getItem().index = hoverIndex;
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

var DraggableSpec = React.createClass({
  
  componentDidMount: function() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  },
  
  indent: function(){
    let spec = this.props.spec;
    return spec.ancestry_depth*40 + 'px'
  },
  
  render: function(){
    const {
      connectDropTarget,
      connectDragSource,
      connectDragPreview,
      isDragging,
      spec,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback
    } = this.props
    
    const classes = isDragging ? 'drag-placeholder' : ''
    const styles = {marginLeft: this.indent()}
    
    return connectDragSource(connectDropTarget(
      <div 
        style={styles}
        className={classes}>
        <SpecComponent
          menuOptions={menuOptions}
          exporting={exporting}
          exportCallback={exportCallback}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          removeTicketCallback={removeTicketCallback}
          spec={spec}></SpecComponent>
      </div>
    ));
  }
})

module.exports = _.flow(
  DragSource('SPECNODE', source, collectSource),
  DropTarget('SPECNODE', target, collectTarget)
)(DraggableSpec);