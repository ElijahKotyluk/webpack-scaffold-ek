module.exports = (answers) => {
	const { name, entry, srcFolder, outputFolder: dist, publicFolder } = answers;

	return {
		entry: `"./${srcFolder}/js/${entry}.js"`,
		mode: '"development"',
		module: {
		  rules: [
				{
					test: "/\.vue$/",
					exclude: "/node_modules/",
					loader: '"vue-loader"',
				},
				{
					enforce: '"pre"',
					test: "/\.js$/",
					exclude: "/node_modules/",
					loader: '"eslint-loader"'
				},
				{
				  test: "/\.js$/",
				  exclude: "/node_modules/",
				  loader: '"babel-loader"',
				},
				{
				  test: "/\\.(png|jpe?g|gif|webp)(\\?.*)?$/",
				  loader: '"file-loader"',
				},
				{
				  test: "/\\.css$/",
				  oneOf: [
					{
					  resourceQuery: "/\\?vue/",
					  use: [
						{
						  loader: '"vue-style-loader"',
						},
						{
						  loader: '"css-loader"',
						},
					  ],
					},
				  ],
				},
		  ],
		},
		plugins: [
		  "new VueLoaderPlugin()",
		  `new HtmlWebpackPlugin({
				templateParameters: {
					PROJECT_NAME: "${name}"
				},
				template: './${publicFolder}/index.html',
		  })`,
		  `new CopyWebpackPlugin([
			{
			  from: './${publicFolder}',
			  to: './${dist}',
			  toType: 'dir',
			  ignore: ['.DS_Store'],
			}
		  ])`,
		],
	}
};
