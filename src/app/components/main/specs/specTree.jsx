var React = require('react');
// var SpecNode = require('./specNode.jsx');
var DropTarget = require('react-dnd').DropTarget;
var DragSource = require('react-dnd').DragSource;
var SpecComponent = require('./spec/spec2.component.jsx');

const treeTarget = {
  drop() {},

  hover(props, monitor) {
    const dragged = monitor.getItem().spec
    const parent = monitor.getItem().parent
    if (!monitor.isOver({shallow: true})) return

    const descendantNode = props.parent;
    if (descendantNode) return
    if (parent == props.parent || dragged == props.parent) return

    props.movePlaceholder(dragged, props.spec, props.parent)
  }
}

function treeCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

var SpecTree = React.createClass({
  
  specNodes: function() {
    const {
      connectDropTarget, 
      specs,
      parent,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback,
      movePlaceholder
    } = this.props
    
    return specs.map( function(spec){
      return (
         <SpecNodeDraggable
          key={spec.id}
          parent={parent}
          menuOptions={menuOptions}
          exporting={exporting}
          exportCallback={exportCallback}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          removeTicketCallback={removeTicketCallback}
          movePlaceholder={movePlaceholder}
          spec={spec}>
        </SpecNodeDraggable>)
    });
  },

  render: function () {
    const {
      connectDropTarget, 
      specs,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback
    } = this.props
    
    return connectDropTarget(
      <div 
        style={{
        position: 'relative',
        minHeight: 10,
        paddingTop: 10,
        marginTop: -11,
        marginLeft: '2em'
      }}>
        {this.specNodes()}
      </div>
    );
  }
});

var SpecTreeTarget = DropTarget('SPECNODE', treeTarget, treeCollect)(SpecTree);
module.exports.SpecTree = SpecTreeTarget;


const nodeSource = {
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

const nodeTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const dragged = monitor.getItem().spec
    const over = props.spec

    if (dragged == over || dragged == props.parent) return
    if (!monitor.isOver({shallow: true})) return

    props.movePlaceholder(dragged, over, props.parent)
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
      removeTicketCallback,
      movePlaceholder
    } = this.props
    
    return connectDropTarget(connectDragPreview(
      <div>
        {connectDragSource(
          <div 
            style={{
              background: 'white',
              border: '1px solid #ccc',
              padding: '1em',
              marginBottom: -1
            }}>
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
        <SpecTreeTarget
          specs={spec.children}
          parent={spec}
          exporting={exporting}
          menuOptions={menuOptions}
          exportCallback={exportCallback}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          movePlaceholder={movePlaceholder}
          removeTicketCallback={removeTicketCallback}></SpecTreeTarget>
      </div>
    ))
  }
});

var SpecNodeDraggable = _.flow(
  DragSource('SPECNODE', nodeSource, collectSource),
  DropTarget('SPECNODE', nodeTarget, collectTarget)
)(SpecNode);

module.exports.SpecNode = SpecNodeDraggable;