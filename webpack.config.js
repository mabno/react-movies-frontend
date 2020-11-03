const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.jsx'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.bundle.js'
	},

	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.json', '.jsx']
	},

	plugins: [
		new MiniCSSExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html'
		})
	],

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.s?css/,
				loader: [
					MiniCSSExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)/,
				loader: 'file-loader'
			}
		]
	},

	devServer: {
		host: '0.0.0.0',
		contentBase: path.resolve(__dirname, 'src'),
		port: 3000,
		historyApiFallback: true
	}
}