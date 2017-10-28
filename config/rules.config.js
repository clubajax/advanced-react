const path = require('path');
const cssFn = require('./css.config');

const libsToBabelize = /date-picker|data-table/;

module.exports = function (isProd, ROOT) {

	const css = cssFn(isProd);

	const babel = {
		test: /\.jsx?$/,
		exclude (path) {

			if (!this.babelizeLogged) {
				this.babelizeLogged = true;
				console.log('babelizing...');
			}

			if (/node_modules/.test(path) && !libsToBabelize.test(path)) {
				return true;
			}

			return false;
		},
		loaders: 'babel-loader',
		include: [
			// see libsToBabelize above
			path.join(ROOT, './app'),
			path.join(ROOT, './node_modules/@clubajax/data-table'),
			// path.join(ROOT, './node_modules/@clubajax/date-picker'),
			// path.join(ROOT, './node_modules/@clubajax/data-table'),
			// path.join(ROOT, './node_modules/@clubajax/react-web-component')
		],
		query: {
			presets: [['env', { targets: { node: 4 } }]]
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