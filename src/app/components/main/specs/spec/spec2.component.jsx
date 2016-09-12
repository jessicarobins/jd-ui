require('../../../../services/specs.service');

var React = require('react');
var SpecComponent = React.createClass({
  getInitialState: function() {
    return {editing: false};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    
  },
  toggleEdit: function(e){
    this.state.editing = !this.state.editing;
  },
  render: function() {
    var jessdocs = angular.element('body').injector();
    var $specs = jessdocs.get('$specs');
    
    var spec;
    if (this.state.editing){
      spec = 
        <form className="specEditForm">
          <input
            type="text"
            value={this.props.spec.description}
            aria-label="edit spec description"
            required />
        </form>
    } else {
      spec = 
        <p onClick={this.toggleEdit}>
          {this.props.spec.description}</p> 
    }
    
    return spec;
  }
})

module.exports = SpecComponent;