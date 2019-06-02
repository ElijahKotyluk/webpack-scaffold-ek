const Generator = require('yeoman-generator');
// import webpack-scaffold helper functions:
const { List, Input, InputValidate } = require('@webpack-cli/webpack-scaffold');

const createWebpackConfig = require('./config/webpack');
const createPackageJson = require('./config/package-json');
const createBabelrc = require('./config/babelrc');
const createEslintrc = require('./config/eslintrc');

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
      outputFolder: 'dist',
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
      Input('entry', 'Which is the entry point of your app? (main)'),
      Input('outputFolder', 'Which folder will your generated bundles be in? (dist)'),
      Input('publicFolder', 'Which folder will your public assets be in? (public)'),
      List('manager', 'Which package manager do you prefer?', ['yarn', 'npm'])
    ]).then(answers => {
      // Do something with user's answers:
      this.answers = answers;
			this.answers.name = (answers.name !== '') ? answers.name.toLowerCase() : this.defaults.name;
			this.answers.entry = (answers.entry !== '') ? answers.entry : this.defaults.entry;
			this.answers.inFolder = (answers.inFolder !== '') ? answers.inFolder : this.defaults.inFolder;
			this.answers.outputFolder = (answers.outputFolder !== '') ? answers.outputFolder : this.defaults.outputFolder;
			this.answers.publicFolder = (answers.publicFolder !== '') ? answers.publicFolder : this.defaults.publicFolder;
    });
  }
  // Write config files to system
  writing() {
    this.config.set('configuration', this.options.env.configuration);
		this.fs.extendJSON(this.destinationPath('package.json'), createPackageJson(this.answers));
		this.fs.extendJSON(this.destinationPath('.babelrc'), createBabelrc());
		this.fs.extendJSON(this.destinationPath('.eslintrc'), createEslintrc());

		const { entry, inFolder: src, publicFolder } = this.answers;
		const templates = [
			{ src: 'public/favicon.ico', dist: `${publicFolder}/favicon.ico` },
			{ src: 'src/main.js', dist: `${src}/${entry}.js` },
			{ src: 'src/App.vue', dist: `${src}/App.vue` },
			{ src: 'src/assets/logo.png', dist: `${src}/assets/logo.png` },
			{ src: 'src/components/HelloWorld.vue', dist: `${src}/components/HelloWorld.vue` },
			{ src: 'config/gitignore', dist: '.gitignore'}
		]

		this.fs.copyTpl(
			this.templatePath('public/index.html'),
			this.destinationPath(`${publicFolder}/index.html`),
			{ title: this.answers.name }
		);

		templates.forEach(template => {
			this.fs.copyTpl(
				this.templatePath(template.src),
				this.destinationPath(template.dist)
			);
		})
  }
  // Install dependencies
  install() {
    this.installDependencies(this.manager)
  }
};
