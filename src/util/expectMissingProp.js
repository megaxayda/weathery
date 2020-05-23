import sinon from 'sinon';

function expectMissingProp(prop, component) {
  sinon.assert.calledWithMatch(
    console.error,
    new RegExp(`Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`${component}\`, but its value is \`undefined\`.`)
  );
}

export default expectMissingProp;
