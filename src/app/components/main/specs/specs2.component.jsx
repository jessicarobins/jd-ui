import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var React = require('react');
var SpecComponent = require('./spec/spec2.component.jsx');

const SpecListComponent = ({
  specs, 
  menuOptions, 
  toggleEditCallback, 
  saveEditCallback,
  removeTagCallback,
  removeTicketCallback }) => {
  var specNodes = specs.map(function(spec) {
    return (
      <ul key={spec.id}>
        <SpecNodeComponent 
          menuOptions={menuOptions}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          removeTicketCallback={removeTicketCallback}
          spec={spec}>
        </SpecNodeComponent>
      </ul>
    );
  });
  return (
    <MuiThemeProvider>
      <div className="spec-list">{specNodes}</div>
    </MuiThemeProvider>
  );
};

const SpecNodeComponent = ({
  spec, 
  toggleEditCallback, 
  saveEditCallback, 
  removeTagCallback,
  removeTicketCallback,
  menuOptions}) => (
  <li>
    <SpecComponent 
      menuOptions={menuOptions}
      toggleEditCallback={toggleEditCallback}
      saveEditCallback={saveEditCallback}
      removeTagCallback={removeTagCallback}
      removeTicketCallback={removeTicketCallback}
      spec={spec}></SpecComponent>
    <SpecListComponent 
      menuOptions={menuOptions}
      specs={spec.children}
      saveEditCallback={saveEditCallback}
      removeTagCallback={removeTagCallback}
      removeTicketCallback={removeTicketCallback}
      toggleEditCallback={toggleEditCallback}></SpecListComponent>
  </li>
);

var jessdocs = require('jessdocs');
jessdocs.value('SpecListComponent', SpecListComponent);
// jessdocs.directive('specList', function(reactDirective) {
//   return reactDirective(
//     SpecListComponent, [
//       'specs', 
//       'menuOptions',
//       'toggleEditCallback', 
//       'saveEditCallback']);
// });
module.exports = SpecListComponent;