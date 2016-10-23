const test = require('tape');
const operation = require('../src/index');

test('a mayor than b', t => {
  t.equal(operation(4, 3), 1);
  t.end();
});

test('a minor than b', t => {
  t.equal(operation(3, 4), 7);
  t.end();
});
