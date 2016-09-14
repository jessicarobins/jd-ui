import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const TagComponent = ({tag, deleteCallback, editing}) => {
  
  const renderDelete = () => {
    if(editing){
      return <TagDeleteComponent></TagDeleteComponent>
    }
  };
  
  return (
    <div 
      className="tag row"
      style={{backgroundColor: tag.color}}>
      <span>{tag.name}</span>
      {renderDelete()}
    </div>
  )
};

const deleteStyles = {
  fontSize: 20 + 'px'
};

const TagDeleteComponent = ({deleteCallback}) => (
  <FontIcon 
    onTouchTap={() => deleteCallback()}
    className="material-icons"
    style={deleteStyles}>close</FontIcon>
);

var jessdocs = require('jessdocs');
jessdocs.value('TagComponent', TagComponent);
module.exports = TagComponent;