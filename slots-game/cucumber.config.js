// cucumber.config.js
const path = require('path');

module.exports = {
  default: {
    require: [
      'src/tests/steps/**/*.ts',
      'src/tests/support/**/*.ts'
    ],
    paths: ['src/tests/features/**/*.feature'],
    format: ['progress'],
    requireModule: ['ts-node/register']
  }
};
