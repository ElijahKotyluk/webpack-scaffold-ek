module.exports = (answers) => {
	const { name, entry, styleEntry, srcFolder, outputFolder: dist, publicFolder } = answers;

	return {
		entry: [
			`"./${srcFolder}/js/${entry}.js"`,
			`"./${srcFolder}/style/${styleEntry}.scss"`
		],
		output: {
			path: `path.resolve(__dirname, "${dist}")`,
			filename: `"${entry}.bundle.js"`,
		},
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
					test: "/\.(sa|sc|c)ss$/",
					use: [
						{
							loader: 'MiniCssExtractPlugin.loader',
							options: {
								hmr: 'isDev',
							},
						},
						'"css-loader"',
						'"sass-loader"',
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
		  `new MiniCssExtractPlugin({
			  filename: isDev ? '${styleEntry}.css' : '${styleEntry}.[hash].css',
			  chunkFileName: isDev ? '[id].css' : '[id].[hash].css',
			})`,
		],
	}
};
