/**
 * Webpack configuration file.
 *
 * @author Nurasyl Aldan <nurassyl.aldan@gmail.com> (https://nurassyl.github.io)
 */

const
path = require('path'),
webpack = require('webpack'),
packageFile = require('./package.json'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
NODE_ENV = process.env.NODE_ENV,
isProd = NODE_ENV === 'production', // !isProd = development
HOSTNAME = 'localhost',
PORT = 8080,
config = {
    entry: {
		vendors: ['jquery', 'popper.js', 'bootstrap'],
		app: './src/main.ts'
	},
    output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
		sourceMapFilename: '[name].[hash].js.map'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
    watch: (!isProd ? true : false),
    watchOptions: {
        aggregateTimeout: 100, // default: 300
        ignored: /node_modules/
    },
    devtool: (!isProd ? 'cheap-module-eval-source-map' : false),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|dist)/,
                use: [
					'awesome-typescript-loader',
					'angular2-template-loader'
				]
			},
			{
				test: /\.component\.sass$/,
				exclude: /node_modules|dist/,
				use: [
					'raw-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.sass$/,
				exclude: /\.component\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: isProd
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isProd
							}
						}
					]
				})
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			// Fonts loader
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash].[ext]'
                    }
                }
			},
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash].[ext]'
                    }
                }
			}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: packageFile.name,
            filename: 'index.html', // Output path: ./dist/index.html
            template: './src/index.htm',
			inject: 'body', // Inject script file to body tag
			minify: {
				minimize: true
			}
        }),
        new webpack.DefinePlugin({
            'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: 'popper.js'
        }),
		new webpack.HotModuleReplacementPlugin(),
        new FaviconsWebpackPlugin({
            logo: './src/logo/logo.svg',
            prefix: 'img/favicons/icons-[hash]', // Output directory
            persistentCache: false,
            inject: true,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)/
		),
		new ExtractTextPlugin('[name].[hash].css'),
		new UglifyJsPlugin()
	],
    devServer: {
        compress: true, // gzip compression
        host: HOSTNAME,
        https: false,
        historyApiFallback: true,
        port: process.env.PORT || PORT,
        index: 'index.html', // Index filename
        contentBase: path.join(__dirname, 'dist'), // Output directory
        publicPath: '/', // URL path
        open: false, // Auto open in the browser
        allowedHosts: [
            HOSTNAME
        ],
		hot: true,
		progress: true
    }
};
module.exports = config;
