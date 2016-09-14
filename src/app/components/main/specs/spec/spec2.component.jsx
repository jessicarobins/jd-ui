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
    return this.props.spec.tag_types.map(function(tag){
      return (
        <TagComponent
          editing={editing}
          key={tag.id}
          tag={tag}></TagComponent>
      );
    });
  },
  
  render: function() {
    var jessdocs = angular.element('body').injector();
    var $specs = jessdocs.get('$specs');
    
    var spec;
    if (this.props.spec.editing){
      spec = 
        <div className="row">
          <form className="specEditForm" onSubmit={this.submitEdit}>
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              aria-label="edit spec description"
              required />
          </form>
          {this.tags(true)}
        </div>
    } else {
      spec = 
        <div className="row">
          <MenuComponent
            menuOptions={this.props.menuOptions}
            spec={this.props.spec}></MenuComponent>
          <span onDoubleClick={this.toggleEdit}>
            {this.props.spec.description}</span>
          {this.tags(false)}
        </div>
    }
    
    return spec;
  }
})

module.exports = SpecComponent;