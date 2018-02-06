'use strict';

const path = require('path');
const webpack = require('webpack');

const srcPath = path.join(__dirname, 'src');
const env = process.env.NODE_ENV

// Default plugins
let plugins = [
];

if (env === 'development') {
	// Development plugins
	plugins = plugins.concat([
	]);
} else if (env === 'production') {
	// Dist plugins
	plugins = plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.NoErrorsPlugin()
	]);
}

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: './dist',
		filename: 'test-ava-jquery.js'
	},
	module: {
		preLoaders: [
			// Lint JS
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: [/node_modules/]
			}
		],
		loaders: [
			// JS
			{
				test: /\.js$/,
				loader: 'babel'
			}
		]
	},
	externals: {
		'jquery': 'jQuery'
	},
	devtool: 'hidden-source-map',
	plugins: plugins,
	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: ['node_modules'],
		alias: {
			node_modules: path.join(__dirname, 'node_modules')
		},
		root: [srcPath]
	},
	eslint: {
		configFile: path.join(__dirname, '.eslintrc')
	}
};
