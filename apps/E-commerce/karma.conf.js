const getBaseConfig = require('../../karma.conf.js');

module.exports = function (config) {
  const baseConfig = getBaseConfig();
  config.set({
    ...baseConfig,
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/apps/e-commerce'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    }
  });
};