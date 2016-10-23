var libCoverage = require('istanbul-lib-coverage');
var libReport = require('istanbul-lib-report');
var reports = require('istanbul-reports');

var IstanbulReporter = function(baseReporterDecorator, rootConfig, logger, helper) {
  var config = rootConfig.istanbulReporter || {};
  var reporters = config.reporters || [];
  var reportDir = config.dir;
  var checkCoverage = config.checkCoverage;
  // default thresholds
  var thresholds = checkCoverage ? {
    lines: checkCoverage.lines || 90,
    functions: checkCoverage.function || 0,
    statements: checkCoverage.statments || 0,
    branches: checkCoverage.branches || 0
  } : undefined;

  baseReporterDecorator(this);

  var map;
  this.onBrowserStart = function(browser) {
    map = libCoverage.createCoverageMap({});
  }

  this.onBrowserComplete = function(browser, result) {
    if (!result || !result.coverage) return;
    map.merge(result.coverage);
  }

  this.onSpecComplete = function(browser, result) {
    if (!result || !result.coverage) return;
    map.merge(result.coverage);
  }

  this.onRunComplete = function(browsers, results) {
    var context = libReport.createContext({
      dir: reportDir
    });

    var tree = libReport.summarizers.pkg(map);

    // reporters
    reporters.forEach(function(reporter) {
      var name = reporter.type;
      var report = reports.create(name, reporter);
      tree.visit(report, context);
    });

    // checkCoverage
    if (checkCoverage) {
      var summary = map.getCoverageSummary();
      // ERROR: Coverage for lines (90.12%) does not meet global threshold (120%)
      Object.keys(thresholds).forEach(function (key) {
        var coverage = summary[key].pct;
        if (coverage < thresholds[key]) {
          results.exitCode = 1;
          console.error('ERROR: Coverage for ' + key + ' (' + coverage + '%) does not meet global threshold (' + thresholds[key] + '%)');
        }
      });
    }
  }
}

IstanbulReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper'];

module.exports = {
  'reporter:istanbul': ['type', IstanbulReporter]
}
