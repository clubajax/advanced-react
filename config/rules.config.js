const path = require('path');
const cssFn = require('./css.config');

module.exports = function (isProd, ROOT) {

	const css = cssFn(isProd);

	const babel = {
		test: /\.jsx?$/,
		exclude (path) {

			if (!this.babelizeLogged) {
				this.babelizeLogged = true;
				console.log('babelizing...');
			}

			if (/node_modules/.test(path)) {
				return true;
			}

			return false;
		},
		include: [
			path.join(ROOT, './app'),
		],
		use:{
			loader: 'babel-loader',
			options:{
				babelrc: true
			}
		}
	};

	const files = {
		test: /\.(jpg|png|svg)$/,
		loader: 'file-loader',
		options: {
			name: '[name].[ext]'
		}
	};

	console.log('css.rules', css);
	const common = [babel, css, files];
	const dev = [];

	return [...common, ...dev];
};