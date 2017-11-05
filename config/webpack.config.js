const path = require('path');
const webpack = require('webpack');

const ROOT = __dirname + '/../';
const PORT = '8888';
const ENV = process.env.API;
const isProd = false;
const chromeOnly = false;

module.exports = function () {

	const appFiles = ['./index.jsx'];
	const appName = isProd ? '[name].[chunkhash].js' : 'app.js';
	let vendorFiles = ['react'];
	if(!isProd){
		vendorFiles = [...vendorFiles,
			'webpack-dev-server/client?http://0.0.0.0:' + PORT
		];

		if (ENV !== 'vm') {
			vendorFiles = [...vendorFiles, 'react-hot-loader/patch', 'webpack/hot/only-dev-server']
		}
	}


	return {

		context: ROOT + '/app',

		resolve: {
			alias:{
				BaseComponent: chromeOnly ? '@clubajax/base-component/src/index' : '@clubajax/base-component/dist/index'
			}
		},

		entry: {
			vendor: vendorFiles,
			app: appFiles
		},

		output: {
			filename: appName,
			path: ROOT + '/dist',
			publicPath: isProd ? '/' : ENV === 'vm' ? '/' : `http://localhost:${PORT}/`
		},

		module: {
			rules: require('./rules.config')({ chromeOnly, ROOT })
		},

		plugins: require('./plugins.config')({ chromeOnly, ROOT }),

		// eval-source-map caused bugs and creates hard-to-read source code
		devtool: isProd ? 'source-map' : 'inline-source-map',

		devServer: require('./server.config')(ROOT, PORT)
	};
};
