const Generate = require('yeoman-generator');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // Each key generates a webpack config file:
    // dev => development webpack config
    opts.env.configurations = {
      dev: {
        topScope: [
          // Fn definitions & imports
        ],
        webpackOptions: {
          // Webpack config
        }
      }
    }
  }
  // Prompt user preferences
  prompting() {}
  // Write config files to system
  writing() {}
  // Install dependencies
  install() {}
};
