const path = require('path');
const cssFn = require('./css.config');

const libsToBabelize = /ui-shared|date-picker|data-table/;

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
		include: [
			// see libsToBabelize above
			path.join(ROOT, './app'),
			path.join(ROOT, './node_modules/@clubajax/data-table'),
			path.join(ROOT, './node_modules/@clubajax/popup-list'),
			// path.join(ROOT, './node_modules/@clubajax/date-picker'),
			// path.join(ROOT, './node_modules/@clubajax/react-web-component')
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