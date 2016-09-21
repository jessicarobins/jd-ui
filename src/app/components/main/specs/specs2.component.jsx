import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var SpecTree = require('./specTree.jsx').SpecTree;
var DraggableSpec = require('./spec/draggableSpec.jsx');

var SpecsComponent = React.createClass({
  
  specs: function(){
    const {
      specs,
      menuOptions, 
      exporting,
      exportCallback,
      toggleEditCallback,
      saveEditCallback,
      removeTagCallback,
      removeTicketCallback,
      move
    } = this.props
    
    return specs.map((spec, i) => {
      return (
        <DraggableSpec 
          key={spec.id}
          menuOptions={menuOptions}
          exporting={exporting}
          exportCallback={exportCallback}
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          removeTagCallback={removeTagCallback}
          removeTicketCallback={removeTicketCallback}
          move={move}
          index={i}
          spec={spec}></DraggableSpec>)
    })
  },
  
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
      move
    } = this.props
    
    return (
      <MuiThemeProvider>
        <div className="spec-list">
          {this.specs()}
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

