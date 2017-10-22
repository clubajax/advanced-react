const ExtractTextPlugin = require('extract-text-webpack-plugin');

let css;

function createCss (isProd) {
	if (!css) {
		const plugins = {
			main: new ExtractTextPlugin({
				filename: isProd ? 'style.[contenthash].css' : 'style.css',
				allChunks: true
			})
		};

		const isApp = /app\/styles\/main\.scss/;
		const rules = {
			main: {
				test: /\.s?css$/,
				use: plugins.main.extract({
					use: ['css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap'],
					fallback: 'style-loader'
				}),
				include (name) {
					const test = isApp.test(name);
					//console.log(' - main.css', test, name);
					return test;
				}
			}
		};
		css = {
			plugins,
			rules
		};
	}
	return css;
}

module.exports = function cssConfig (isProd) {
	return createCss(isProd);
};
