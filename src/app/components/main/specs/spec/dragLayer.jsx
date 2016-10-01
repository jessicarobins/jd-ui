var DragLayer = require('react-dnd').DragLayer;
var React = require('react');

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

var SpecDragLayer = React.createClass({
  
  indent: function(spec){
    return spec.ancestry_depth*40 + 'px'
  },
  
  specs: function(){
    const {
      item,
      children,
      move
    } = this.props
    
    const specs = children(item.index);
    return specs.map((spec) => {
      return (
        <p 
          style={{marginLeft: this.indent(spec)}}
          key={spec.id}>{spec.description}</p>)
    })
  },
  
  render: function(){
    const { item, itemType, isDragging } = this.props;
    
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.specs()}
        </div>
      </div>
    );
  }
});

module.exports = DragLayer(collect)(SpecDragLayer);