var React = require('react');
var SpecsComponent = require('./specs2.component.jsx');

const Specs = ({
  specs, 
  exporting,
  menuOptions, 
  exportCallback,
  toggleEditCallback, 
  saveEditCallback,
  removeTagCallback,
  removeTicketCallback,
  movePlaceholder}) => {
  return (
    <div>
      <SpecsComponent
        specs={specs}
        exporting={exporting}
        menuOptions={menuOptions}
        exportCallback={exportCallback}
        toggleEditCallback={toggleEditCallback}
        saveEditCallback={saveEditCallback}
        removeTagCallback={removeTagCallback}
        movePlaceholder={movePlaceholder}
        removeTicketCallback={removeTicketCallback}></SpecsComponent>
    </div>
  );
};

var jessdocs = require('jessdocs');
jessdocs.value('Specs', Specs);

module.exports = Specs;