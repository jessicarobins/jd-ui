var TagComponent = require('../../tag/tag.jsx');
var MenuComponent = require('./react-menu/menu.jsx');
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import React from 'react';

var SpecComponent = React.createClass({
  getInitialState: function() {
    return {description: this.props.spec.description};
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  submitEdit: function(e) {
    e.preventDefault();
    this.props.saveEditCallback(this.props.spec, this.state.description);
  },
  toggleEdit: function(e){
    this.props.toggleEditCallback(this.props.spec);
  },
  beforeDescription: function(){
    if(this.props.spec.editing){
      return;
    }
    if(this.props.exporting){
      return (
        <Checkbox 
          defaultChecked={this.props.spec.exporting}
          onCheck={() =>this.props.exportCallback(this.props.spec)}
          style={{width: 'auto'}}/>)
    }
    return (
      <MenuComponent
        menuOptions={this.props.menuOptions}
        spec={this.props.spec}></MenuComponent>);
  },
  description: function(){
    if(this.props.spec.editing){
      return (
        <form className="specEditForm" onSubmit={this.submitEdit}>
          <TextField
            autoFocus
            id={this.props.spec.id + 'textfield'}
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            aria-label="edit spec description"
            required />
        </form>)
    }
    return (
      <span 
        className="spec-description drag-handle"
        onDoubleClick={this.toggleEdit}>
        {this.props.spec.description}</span>)
  },
  afterDescription: function(){
    let editing = this.props.spec.editing;
    return (
      <div className="row tags">
        {this.comments()}
        {this.tickets(editing)}
        {this.tags(editing)}
      </div>)
  },
  tags: function(editing){
    let spec = this.props.spec;
    let removeCallback = this.props.removeTagCallback;
    return spec.tag_types.map(function(tag){
      return (
        <TagComponent
          spec={spec}
          deleteCallback={removeCallback}
          editing={editing}
          key={tag.id}
          tag={tag}></TagComponent>
      );
    });
  },
  tickets: function(editing){
    let spec = this.props.spec;
    let removeCallback = this.props.removeTicketCallback;
    return spec.tickets.map(function(tag){
      return (
        <TagComponent
          spec={spec}
          deleteCallback={removeCallback}
          editing={editing}
          key={tag.id}
          tag={tag}></TagComponent>
      );
    });
  },
  comments: function(){
    let unresolved = _.filter(this.props.spec.comments, {resolved: false});
    let count = _.size(unresolved);
    if(count > 0){
      return (
        <TagComponent
          editing={false}
          tag={{name: count, color: 'rgb(0,184,212)'}}></TagComponent>
      )
    }
  },
  indent: function(){
    let spec = this.props.spec;
    return spec.ancestry_depth*40 + 'px'
  },
  
  render: function() {
    return(    
      <div 
        style={{paddingLeft: this.indent()}}
        className="row spec">
        {this.beforeDescription()}
        <div className="row spec-info">
          {this.description()}
          {this.afterDescription()}
        </div>
      </div>)
  }
})

module.exports = SpecComponent;