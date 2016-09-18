var React = require('react');
var DropTarget = require('react-dnd').DropTarget;
var DragSource = require('react-dnd').DragSource;
var SpecTree = require('./specTree.jsx');
var SpecComponent = require('./spec/spec2.component.jsx');

const source = {
  beginDrag(props) {
    console.log('props', props)
    return {
      id: props.spec.id,
      spec: props.spec,
      parent: props.parent,
      items: props.spec.children
    }
  },

  isDragging(props, monitor) {
    return props.spec == monitor.getItem()
  }
}

const target = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const dragged = monitor.getItem()
    const over = props.spec

    if (dragged.id == over.id || dragged.id == props.parent) return
    if (!monitor.isOver({shallow: true})) return

    props.movePlaceholder(dragged.spec, over, props.parent)
  }
}

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

var SpecNode = React.createClass({

  tree: function(){
    const {
      connectDropTarget, 
      connectDragPreview, 
      connectDragSource,
      spec,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback
    } = this.props
    
    return (
      <SpecTree
          specs={spec.children}
          exporting={exporting}
          menuOptions={menuOptions}
          exportCallback={exportCallback}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          removeTicketCallback={removeTicketCallback}></SpecTree>)
  },
  render: function() {
    const {
      connectDropTarget, 
      connectDragPreview, 
      connectDragSource,
      spec,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback
    } = this.props
    
    return connectDropTarget(connectDragPreview(
      <div>
        {connectDragSource(
          <div>
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
        )}
        
      </div>
    ))
  }
});

module.exports = _.flow(
  DragSource('SPECNODE', source, collectSource),
  DropTarget('SPECNODE', target, collectTarget)
)(SpecNode);

// module.exports = SpecNode;