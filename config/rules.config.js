const path = require('path');
const cssFn = require('./css.config');
const browserChrom = [
	"chrome >= 62"
];
const browserCompat = [
	"last 2 versions"
];

module.exports = function (options) {

	const css = cssFn(options.isProd);

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
			path.join(options.ROOT, './app'),
		],
		use:{
			loader: 'babel-loader',
			options:{
				//babelrc: true
				presets: [
					"react",
					[
						"env",
						{
							"targets": {
								"browsers": options.chromeOnly ? browserChrom : browserCompat
							}
						}
					]
				],
				plugins: [
					"react-hot-loader/babel"
				]
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