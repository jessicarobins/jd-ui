var React = require('react');
var SpecNode = require('./specNode.jsx');
var DropTarget = require('react-dnd').DropTarget;

const target = {
  drop() {},

  hover(props, monitor) {
    const {id: draggedId, parent, items} = monitor.getItem()

    if (!monitor.isOver({shallow: true})) return

    const descendantNode = props.parent;
    if (descendantNode) return
    if (parent == props.parent || draggedId == props.parent) return

    props.movePlaceholder(draggedId, props.id, props.parent)
  }
}

function collect(connect, monitor) {
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
         <SpecNode 
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
        </SpecNode>)
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

module.exports = DropTarget('SPECNODE', target, collect)(SpecTree);
// module.exports = SpecTree;