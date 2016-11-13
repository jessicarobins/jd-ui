import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var React = require('react');
var SpecComponent = require('./spec/spec2.component.jsx');

const SpecRootComponent = React.createClass({
  
  specNodes: function() {
    let {
      specs, 
      exporting,
      menuOptions, 
      exportCallback,
      toggleEditCallback, 
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback,
      hoverCallback } = this.props
    return ( specs.map(function(spec) {
      return (
        <SpecNodeComponent 
          key={spec.id}
          menuOptions={menuOptions}
          exporting={exporting}
          exportCallback={exportCallback}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          removeTicketCallback={removeTicketCallback}
          spec={spec}
          hoverCallback={hoverCallback}>
        </SpecNodeComponent>)
    }))
  },
  
  componentDidMount: function(){
    $('.sortable').sortable(this.props.sortableOptions)
  },
  
  render: function() {
    return (<MuiThemeProvider>
      <div className="spec-list">
        <ul className="sortable" data-parent-id="">
          {this.specNodes()}
        </ul>
      </div>
    </MuiThemeProvider>)
  }
})

const SpecNodeComponent = ({
  spec, 
  exporting,
  exportCallback,
  toggleEditCallback, 
  saveEditCallback, 
  removeTagCallback,
  removeTicketCallback,
  menuOptions,
  hoverCallback
}) => {
    
  var childNodes = spec.children.map(function(child) {
    return (
      <SpecNodeComponent 
        key={child.id}
        menuOptions={menuOptions}
        exporting={exporting}
        exportCallback={exportCallback}
        toggleEditCallback={toggleEditCallback}
        saveEditCallback={saveEditCallback}
        removeTagCallback={removeTagCallback}
        removeTicketCallback={removeTicketCallback}
        spec={child}
        hoverCallback={hoverCallback}>
      </SpecNodeComponent>
    );
  });
  return (
    <li data-spec-id={spec.id}>
      <SpecComponent 
        menuOptions={menuOptions}
        exporting={exporting}
        exportCallback={exportCallback}
        toggleEditCallback={toggleEditCallback}
        saveEditCallback={saveEditCallback}
        removeTagCallback={removeTagCallback}
        removeTicketCallback={removeTicketCallback}
        spec={spec}
        hoverCallback={hoverCallback}></SpecComponent>
        <ul data-parent-id={spec.id}>
          {childNodes}
        </ul>
    </li>)
};

var jessdocs = require('jessdocs');
jessdocs.value('SpecRootComponent', SpecRootComponent);
// jessdocs.directive('specList', function(reactDirective) {
//   return reactDirective(
//     SpecListComponent, [
//       'specs', 
//       'menuOptions',
//       'toggleEditCallback', 
//       'saveEditCallback']);
// });
module.exports = SpecRootComponent;