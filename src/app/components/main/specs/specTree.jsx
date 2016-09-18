var React = require('react');
// var SpecNode = require('./specNode.jsx');
var DropTarget = require('react-dnd').DropTarget;
var DragSource = require('react-dnd').DragSource;
var SpecComponent = require('./spec/spec2.component.jsx');

const treeTarget = {
  drop() {},

  hover(props, monitor) {
    const {dragged, parent, items} = monitor.getItem()

    if (!monitor.isOver({shallow: true})) return

    const descendantNode = props.parent;
    if (descendantNode) return
    if (parent == props.parent || dragged == props.parent) return

    props.movePlaceholder(dragged.spec, props.spec, props.parent)
  }
}

function treeCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var SpecTree = React.createClass({
  
  specNodes: function() {
    const {
      connectDropTarget, 
      specs,
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
  specNodes: function() {
    const {
      connectDropTarget, 
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
    
    return spec.children.map( function(spec){
      return (
         <SpecNodeDraggable 
          key={spec.id}
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
      removeTicketCallback,
      movePlaceholder
    } = this.props
    
    const tree =
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
    return tree
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
        {this.tree()}
      </div>
    ))
  }
});

var SpecNodeDraggable = _.flow(
  DragSource('SPECNODE', nodeSource, collectSource),
  DropTarget('SPECNODE', nodeTarget, collectTarget)
)(SpecNode);

module.exports.SpecNode = SpecNodeDraggable;