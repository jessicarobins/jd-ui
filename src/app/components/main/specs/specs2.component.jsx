import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var SpecTree = require('./specTree.jsx');

var SpecsComponent = React.createClass({
    
  render: function () {
    const {
      specs,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback,
      movePlaceholder
    } = this.props
    
    return (
      <MuiThemeProvider>
        <div className="spec-list">
          <SpecTree
            specs={specs}
            parent={null}
            movePlaceholder={movePlaceholder}
            exporting={exporting}
            menuOptions={menuOptions}
            exportCallback={exportCallback}
            toggleEditCallback={toggleEditCallback}
            saveEditCallback={saveEditCallback}
            removeTagCallback={removeTagCallback}
            removeTicketCallback={removeTicketCallback}></SpecTree>
        </div>
      </MuiThemeProvider>
    );
  }
});

// jessdocs.directive('specList', function(reactDirective) {
//   return reactDirective(
//     SpecListComponent, [
//       'specs', 
//       'menuOptions',
//       'toggleEditCallback', 
//       'saveEditCallback']);
// });

module.exports = DragDropContext(HTML5Backend)(SpecsComponent);

// module.exports = SpecTree;

