import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var React = require('react');
var SpecComponent = require('./spec/spec2.component.jsx');

const SpecRootComponent = ({
  specs, 
  exporting,
  menuOptions, 
  exportCallback,
  toggleEditCallback, 
  saveEditCallback,
  removeTagCallback,
  removeTicketCallback }) => {
  var specNodes = specs.map(function(spec) {
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
        spec={spec}>
      </SpecNodeComponent>
    );
  });
  return (
    <MuiThemeProvider>
      <div className="spec-list">
        <ul>
          {specNodes}
        </ul>
      </div>
    </MuiThemeProvider>
  );
};

const SpecNodeComponent = ({
  spec, 
  exporting,
  exportCallback,
  toggleEditCallback, 
  saveEditCallback, 
  removeTagCallback,
  removeTicketCallback,
  menuOptions}) => {
    
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
        spec={child}>
      </SpecNodeComponent>
    );
  });
  return (
    <li>
      <div>
        <div>
          <SpecComponent 
            menuOptions={menuOptions}
            exporting={exporting}
            exportCallback={exportCallback}
            toggleEditCallback={toggleEditCallback}
            saveEditCallback={saveEditCallback}
            removeTagCallback={removeTagCallback}
            removeTicketCallback={removeTicketCallback}
            spec={spec}></SpecComponent>
            <ul>
              {childNodes}
            </ul>
          </div>
        </div>
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