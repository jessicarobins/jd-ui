import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

var SpecComponent = require('./spec2.component.jsx');

const source = {
  beginDrag(props) {
    return {
      id: props.spec.id,
      index: props.index
    };
  }
};

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

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
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

var DraggableSpec = React.createClass({
  
  indent: function(){
    let spec = this.props.spec;
    return spec.ancestry_depth*40 + 'px'
  },
  
  render: function(){
    const {
      connectDropTarget,
      connectDragSource,
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
    
    return connectDragSource(connectDropTarget(
      <div 
        style={{marginLeft: this.indent()}}
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