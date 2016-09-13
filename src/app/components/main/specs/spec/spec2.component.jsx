require('../../../../services/specs.service');
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
  render: function() {
    var jessdocs = angular.element('body').injector();
    var $specs = jessdocs.get('$specs');
    
    var spec;
    if (this.props.spec.editing){
      spec = 
        <form className="specEditForm" onSubmit={this.submitEdit}>
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            aria-label="edit spec description"
            required />
        </form>
    } else {
      spec = 
        <div className="row">
          <MenuComponent
            menuOptions={this.props.menuOptions}
            spec={this.props.spec}></MenuComponent>
          <span onDoubleClick={this.toggleEdit}>
            {this.props.spec.description}</span>
        </div>
    }
    
    return spec;
  }
})

module.exports = SpecComponent;