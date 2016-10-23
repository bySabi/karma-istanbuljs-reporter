const libCoverage = require('istanbul-lib-coverage');
const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');

const IstanbulReporter = function(baseReporterDecorator, rootConfig, logger, helper) {
  const config = rootConfig.istanbulReporter || {};
  const reporters = config.reporters || [];
  const reportDir = config.dir;
  const checkCoverage = config.checkCoverage;
  // default thresholds
  const thresholds = checkCoverage ? {
    lines: checkCoverage.lines || 90,
    functions: checkCoverage.function || 0,
    statements: checkCoverage.statments || 0,
    branches: checkCoverage.branches || 0
  } : undefined;

  baseReporterDecorator(this);

  let map;
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
    const context = libReport.createContext({
      dir: reportDir
    });

    const tree = libReport.summarizers.pkg(map);

    // reporters
    reporters.forEach(function(reporter) {
      const name = reporter.type;
      const report = reports.create(name, reporter);
      tree.visit(report, context);
    });

    // checkCoverage
    if (checkCoverage) {
      const summary = map.getCoverageSummary();
      // ERROR: Coverage for lines (90.12%) does not meet global threshold (120%)
      Object.keys(thresholds).forEach(function (key) {
        const coverage = summary[key].pct;
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
