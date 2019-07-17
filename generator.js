const Generator = require('yeoman-generator');
// import webpack-scaffold helper functions:
const { List, Input, InputValidate } = require('@webpack-cli/webpack-scaffold');

const createWebpackConfig = require('./config/webpack');
const createPackageJson = require('./config/package-json');
const createBabelrc = require('./config/babel');
const createEslintrc = require('./config/eslint');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // Each key generates a webpack config file:
    // dev => development webpack config
    opts.env.configuration = {
      dev: {
        topScope: [
          // Fn definitions & imports
        ],
        webpackOptions: {
          // Webpack config
        }
      }
    }

    // Package managers:
    this.manager = {
      yarn: false,
      npm: false,
      bower: false
    }

    // Default answers:
    this.defaults = {
      name: 'my-vue-project',
      srcFolder: 'src',
      entry: 'main',
      styleEntry: 'main',
      outputFolder: 'dist',
      publicFolder: 'public'
    }
  }
  // Set root path:
  paths() {

  }

  // Prompt user preferences:
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
      Input('entry', 'What would you like the entry point of your app to be named? (main)'),
      Input('styleEntry', 'What would you like the entry point of your styles to be named? (main)'),
      Input('outputFolder', 'Which folder will your generated bundles be in? (dist)'),
      Input('publicFolder', 'Which folder will your public assets be in? (public)'),
      List('manager', 'Which package manager do you prefer?', ['yarn', 'npm'])
    ]).then(answers => {
      // Do something with user's answers:
      this.answers = answers;
			this.answers.name = (answers.name !== '') ? answers.name.toLowerCase() : this.defaults.name;
      this.answers.entry = (answers.entry !== '') ? answers.entry : this.defaults.entry;
      this.answers.styleEntry = (answers.styleEntry !== '') ? answers.styleEntry : this.defaults.styleEntry;
			this.answers.srcFolder = (answers.srcFolder !== '') ? answers.srcFolder : this.defaults.srcFolder;
			this.answers.outputFolder = (answers.outputFolder !== '') ? answers.outputFolder : this.defaults.outputFolder;
			this.answers.publicFolder = (answers.publicFolder !== '') ? answers.publicFolder : this.defaults.publicFolder;

      this.manager[this.answers.manager] = true;
      this.options.env.configuration.dev.webpackOptions = createWebpackConfig(this.answers);
      this.options.env.configuration.dev.topScope = [
        "const HtmlWebpackPlugin = require('html-webpack-plugin')",
        "const MiniCssExtractPlugin = require('mini-css-extract-plugin')",
        "const VueLoaderPlugin = require('vue-loader/lib/plugin')",
        "const path = require('path')",
        "const isDev = process.env.NODE_ENV !== 'production'",
        "\n"
      ];
    });
  }
  // Write config files to system
  writing() {
    // Set root destination after prompt:
    this.destinationRoot(`${this.answers.name}`)

    this.config.set('configuration', this.options.env.configuration);
		this.fs.extendJSON(this.destinationPath('package.json'), createPackageJson(this.answers));
		this.fs.extendJSON(this.destinationPath('.babelrc'), createBabelrc());
		this.fs.extendJSON(this.destinationPath('.eslintrc'), createEslintrc());

		const { entry, styleEntry, name: rootDir, srcFolder, publicFolder } = this.answers;
		const templates = [
			{ src: 'public/favicon.ico', dist: `${publicFolder}/favicon.ico` },
      { src: 'src/js/main.js', dist: `${srcFolder}/js/${entry}.js` },
      { src: 'src/style/main.scss', dist: `${srcFolder}/style/${styleEntry}.scss`},
			{ src: 'src/js/App.vue', dist: `${srcFolder}/js/App.vue` },
      { src: 'src/js/components/HelloWorld.vue', dist: `${srcFolder}/js/components/HelloWorld.vue` },
      { src: 'src/js/store/index.js', dist: `${srcFolder}/js/store/index.js` },
      { src: 'src/js/store/modules/example.js', dist: `${srcFolder}/js/store/modules/example.js` },
      { src: 'git/gitignore', dist: `.gitignore`},
      { src: 'test/test.spec.js', dist: `test/test.spec.js`}
		]

		this.fs.copyTpl(
			this.templatePath('public/index.html'),
			this.destinationPath(`${publicFolder}/index.html`),
			{ title: rootDir }
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
