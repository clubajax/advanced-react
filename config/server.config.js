module.exports = function server (ROOT) {

	return {
		// messages for errors or HMR (quite verbose)
		// Possible values are none, error, warning or info (default).
		clientLogLevel: 'none',

		host: '0.0.0.0',
		contentBase: `${ROOT}dist`,
		historyApiFallback: true,
		// if not true, css will trigger a full page reload
		hot: true
	};
};