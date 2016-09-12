var React = require('react');
var SpecComponent = require('./spec/spec2.component.jsx');

const SpecListComponent = ({specs, toggleEditCallback, saveEditCallback}) => {
  var specNodes = specs.map(function(spec) {
    return (
      <ul key={spec.id}>
        <SpecNodeComponent 
          toggleEditCallback={toggleEditCallback}
          saveEditCallback={saveEditCallback}
          spec={spec}>
        </SpecNodeComponent>
      </ul>
    );
  });
  return (
    <div className="spec-list">{specNodes}</div>
  );
};

const SpecNodeComponent = ({spec, toggleEditCallback, saveEditCallback}) => (
  <li>
    <SpecComponent 
      toggleEditCallback={toggleEditCallback}
      saveEditCallback={saveEditCallback}
      spec={spec}></SpecComponent>
    <SpecListComponent 
      specs={spec.children}
      saveEditCallback={saveEditCallback}
      toggleEditCallback={toggleEditCallback}></SpecListComponent>
  </li>
);

var jessdocs = require('jessdocs');
jessdocs.value('SpecListComponent', SpecListComponent);
module.exports = SpecListComponent;