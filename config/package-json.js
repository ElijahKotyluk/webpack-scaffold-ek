module.exports = (answers) => {

	const { name, entry, srcFolder } = answers;

  return ({
    "name": name,
    "version": "1.0.0",
    "main": `${srcFolder}/js/${entry}.js`,
    "license": "MIT",
    "jest": {
      "roots": [
        "test/"
      ],
      "testMatch": [
        "test/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
      ]
    },
    "scripts": {
      "serve": "webpack-dev-server --mode development --progress --hot --open",
      "build": "webpack --mode production --progress",
      "test": "jest --coverage",
      "lint": `eslint ${srcFolder}/**/*.{js,vue}`,
      "lint:fix": `eslint --fix ${srcFolder}/js/*.{js,vue} ${srcFolder}/js/**/*.{js,vue}`,
      "commit": "yarn git-cz"
    },
    "dependencies": {
      "vue": "^2.6.9"
    },
    "devDependencies": {
      "@babel/core": "^7.5.0",
      "@babel/preset-env": "^7.5.0",
      "@babel/preset-stage-2": "^7.0.0",
      "babel-eslint": "^10.0.2",
      "babel-jest": "^24.8.0",
      "babel-loader": "^8.0.6",
      "commitizen": "^3.1.1",
      "css-loader": "^2.1.1",
      "eslint": "^6.0.1",
      "eslint-config-airbnb-base": "^13.1.0",
      "eslint-loader": "^2.2.1",
      "eslint-plugin-import": "^2.18.0",
      "eslint-plugin-vue": "^5.2.3",
      "file-loader": "^3.0.1",
      "html-webpack-plugin": "^3.2.0",
      "jest": "^24.8.0",
      "mini-css-extract-plugin": "^0.7.0",
      "node-sass": "^4.12.0",
      "sass-loader": "^7.1.0",
      "vue-loader": "^15.7.0",
      "vue-template-compiler": "^2.6.9",
      "webpack": "^4.29.6",
      "webpack-cli": "^3.2.3",
      "webpack-dev-server": "^3.2.1"
    }
  })
}
