var React = require('react');
var SpecComponent = require('./spec/spec2.component.jsx');

const SpecListComponent = ({specs}) => {
  var specNodes = specs.map(function(spec) {
    return (
      <ul key={spec.id}>
        <SpecNodeComponent 
          spec={spec}>
        </SpecNodeComponent>
      </ul>
    );
  });
  return (
    <div>{specNodes}</div>
  );
};

const SpecNodeComponent = ({spec}) => (
  <li>
    <SpecComponent spec={spec}></SpecComponent>
    <SpecListComponent specs={spec.children}></SpecListComponent>
  </li>
);

var jessdocs = require('jessdocs');
jessdocs.value('SpecListComponent', SpecListComponent);
module.exports = SpecListComponent;