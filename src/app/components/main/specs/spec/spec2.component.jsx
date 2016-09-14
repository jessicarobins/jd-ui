require('../../../../services/specs.service');
var TagComponent = require('../../tag/tag.jsx');
var MenuComponent = require('./react-menu/menu.jsx');

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
  
  render: function() {
    var jessdocs = angular.element('body').injector();
    var $specs = jessdocs.get('$specs');
    
    var spec;
    if (this.props.spec.editing){
      spec = 
        <div className="row spec">
          <div className="row spec-info">
            <form className="specEditForm" onSubmit={this.submitEdit}>
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                aria-label="edit spec description"
                required />
            </form>
            {this.comments()}
            {this.tags(true)}
            {this.tickets(true)}
          </div>
        </div>
    } else {
      spec = 
        <div className="row spec">
          <MenuComponent
            menuOptions={this.props.menuOptions}
            spec={this.props.spec}></MenuComponent>
            <div className="row spec-info">
              <span 
                className="spec-description"
                onDoubleClick={this.toggleEdit}>
                {this.props.spec.description}</span>
              {this.comments()}
              {this.tickets(false)}
              {this.tags(false)}
            </div>
        </div>
    }
    
    return spec;
  }
})

module.exports = SpecComponent;