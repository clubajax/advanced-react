let css;

function createCss (isProd) {
	return {
		test: /\.scss$/,
		use: [{
			loader: "style-loader"
		}, {
			loader: "css-loader", options: {
				sourceMap: true
			}
		}, {
			loader: "sass-loader", options: {
				sourceMap: true
			}
		}]
	};
}

module.exports = function cssConfig () {
	return createCss();
};
