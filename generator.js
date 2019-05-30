const Generate = require('yeoman-generator');
// import webpack-scaffold helper functions:
const { List, Input } = require('@webpack-cli/webpack-scaffold');

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
  prompting() {
    return this.prompt({
      // Prompt questions for user:
      Input('project-name', 'What would you like to name your project? (my-project)')
    }).then(answers => {
      // Do something with user's answers:
    });
  }
  // Write config files to system
  writing() {}
  // Install dependencies
  install() {}
};
