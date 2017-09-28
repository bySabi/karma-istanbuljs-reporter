# karma-istanbuljs-reporter

[![npm version](https://badge.fury.io/js/karma-istanbuljs-reporter.svg)](https://badge.fury.io/js/karma-istanbuljs-reporter)
[![npm downloads](https://img.shields.io/npm/dm/karma-istanbuljs-reporter.svg?style=flat-square)](https://www.npmjs.com/package/karma-istanbuljs-reporter)
[![Build Status](https://travis-ci.org/bySabi/karma-istanbuljs-reporter.svg?branch=master)](https://travis-ci.org/bySabi/karma-istanbuljs-reporter)
[![Windows Tests](https://img.shields.io/appveyor/ci/bySabi/karma-istanbuljs-reporter/master.svg?label=Windows%20Tests)](https://ci.appveyor.com/project/bySabi/karma-istanbuljs-reporter)
[![bitHound Overall Score](https://www.bithound.io/github/bySabi/karma-istanbuljs-reporter/badges/score.svg)](https://www.bithound.io/github/bySabi/karma-istanbuljs-reporter)
[![Donate](https://img.shields.io/badge/$-support-green.svg?style=flat-square)](https://paypal.me/bySabi/10)

> a Karma plugin for generate code coverage using new, v1, [Istanbul](https://istanbul.js.org/) API

This reporter try to mimic behaviours and settings of [nyc](https://github.com/istanbuljs/nyc) tool more than [karma-coverage](https://github.com/karma-runner/karma-coverage)

## Instrumentation
Use [babel-istanbul-plugin](https://github.com/istanbuljs/babel-plugin-istanbul) for source instrumentation. Don´t forget `exclude` test files from instrumentation using `exclude/include` [rules](https://github.com/istanbuljs/babel-plugin-istanbul#ignoring-files)

## Installation

### npm
```bash
npm install karma-istanbuljs-reporter --save-dev
```

## Usage

Add `karma.conf.js` file to project.

## Examples of `karma.conf.js`
### Basic
```js
module.exports = function(config) {
  config.set({
  ...
    reporters: ['progress', 'istanbul'],
    istanbulReporter: {
      reporters: [
        { type: 'text' }
      ]
    },
  ...
  });
}
```

### Multiple reporters
```js
module.exports = function(config) {
  config.set({
  ...
    reporters: ['progress', 'istanbul'],
    istanbulReporter: {
      dir: 'cover/',     // changed default output dir from 'coverage/'
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    },
  ...
  });
}
```
#### Supported reporters [istanbul-reports](https://github.com/istanbuljs/istanbul-reports/tree/master/lib)

### Checking coverage
`karma-istanbuljs-reporter` can fail tests if coverage falls below a threshold.
```js
module.exports = function(config) {
  config.set({
  ...
    reporters: ['progress', 'istanbul'],
    istanbulReporter: {
      checkCoverage: true
    },
  ...
  });
}
```

#### Default `thresholds`
```js
{
  lines: 90,
  functions: 0,
  statements: 0,
  branches: 0
}
```

### Checking coverage with custom thresholds
```js
module.exports = function(config) {
  config.set({
  ...
    reporters: ['progress', 'istanbul'],
    istanbulReporter: {
      checkCoverage: {
        lines: 95,
        functions: 95,
        statements: 95,
        branches: 95
      }
    },
  ...
```

## WIP: 'Include all sources' feature
[issues#1](https://github.com/bySabi/karma-istanbuljs-reporter/issues/1)

## Example
- [karma-istanbuljs-reporter--example](https://github.com/bySabi/karma-istanbuljs-reporter/tree/example)

## Credits

### author
* bySabi Files <> [@bySabi](https://github.com/bySabi)

### contributors
* Josh Baldwin <> [@joshbaldwin](https://github.com/joshbaldwin)


## Contributing
* Documentation improvement
* Feel free to send any PR

## License

[ISC][isc-license]

[isc-license]:./LICENSE
