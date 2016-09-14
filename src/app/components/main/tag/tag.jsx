import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const TagComponent = ({tag, deleteCallback, editing, spec}) => {
  
  const renderDelete = () => {
    if(editing){
      return (
        <TagDeleteComponent 
          tag={tag}
          deleteCallback={deleteCallback}
          spec={spec}></TagDeleteComponent>)
    }
  };
  
  const renderName = () => {
    if(tag.url){
      return(
        <a 
          className="tag-url name"
          href={tag.url}
          target="_blank">
          {tag.name}
        </a>
      )
    } else {
      return <div className="name">{tag.name}</div>
    }
  }
  
  return (
    <div 
      className="tag row"
      style={{backgroundColor: tag.color || 'midnightblue'}}>
      {renderName()}
      {renderDelete()}
    </div>
  )
};

const TagDeleteComponent = ({deleteCallback, spec, tag}) => (
  <FontIcon 
    onTouchTap={() => deleteCallback(tag, spec)}
    className="close-button material-icons">close</FontIcon>
);

var jessdocs = require('jessdocs');
jessdocs.value('TagComponent', TagComponent);
module.exports = TagComponent;