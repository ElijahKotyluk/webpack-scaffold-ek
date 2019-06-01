const Generator = require('yeoman-generator');
// import webpack-scaffold helper functions:
const { List, Input, InputValidate } = require('@webpack-cli/webpack-scaffold');

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
      },
      // Production configuration:
      prod: {}
    }

    this.manager = {
      yarn: false,
      npm: false
    }

    this.defaults = {
      name: 'my-vue-project',
      inFolder: 'src',
      entry: 'main',
      outFolder: 'dist',
      publicFolder: 'public'
    }
  }
  // Prompt user preferences
  prompting() {

    // Validate project name:
    const validateName = (value) => {
      // Check if project name contains spaces:
      if(value.indexOf(' ') > 0) {
        return 'Invalid name: spaces are not allowed, please try again.';
      } else {
        return true
      }
    }
    // Prompt questions for user:
    return this.prompt([
      InputValidate('name', 'How do you want to name your project? (my-vue-project)', validateName),
      Input('srcFolder', 'Which folder will your source code be in? (src)'),
      Input('entry', 'Which is the entry point of your app? (main.js)'),
      Input('outputFolder', 'Which folder will your generated bundles be in? (dist)'),
      Input('publicFolder', 'Which folder will your public assets be in? (public)'),
      List('manager', 'Which package manager do you prefer?', ['yarn', 'npm'])
    ]).then(answers => {
      // Do something with user's answers:
      this.answers = answers;
			this.answers.name = (answers.name !== '') ? answers.name.toLowerCase() : this.defaults.name;
			this.answers.entry = (answers.entry !== '') ? answers.entry : this.defaults.entry;
			this.answers.inFolder = (answers.inFolder !== '') ? answers.inFolder : this.defaults.inFolder;
			this.answers.outFolder = (answers.outFolder !== '') ? answers.outFolder : this.defaults.outFolder;
			this.answers.publicFolder = (answers.publicFolder !== '') ? answers.publicFolder : this.defaults.publicFolder;
    });
  }
  // Write config files to system
  writing() {}
  // Install dependencies
  install() {}
};
