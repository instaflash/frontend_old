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
config = {
    entry: {
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
    devtool: (!isProd ? 'source-map' : false),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: ['awesome-typescript-loader']
            },
            {
				test: /\.sass$/,
				exclude: /\.component\.sass$/,
                use: isProd ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
						{
							loader: 'css-loader',
							options: {
								minimize: isProd
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
				}) : [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.component\.sass$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'styles/[name].[ext]?[hash]'
						}
					},
					'extract-loader',
					{
						loader: 'css-loader',
						options: {
							minimize: isProd
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
			},
			{
				test: /\.component\.html$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'templates/[name].[ext]?[hash]'
						}
					},
					'extract-loader',
					{
						loader: 'html-loader',
						options: {
							minimize: isProd,
							caseSensitive: true,
							removeComments: true,
							minifyCSS: isProd,
							minifyJS: isProd,
							minifyURLs: isProd
						}
					}
				]
			},
			// FontAwesome fonts loader
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]?[hash]'
                    }
                }
			},
            {
                test: /\.jpe?g|png|gif$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]?[hash]'
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
				minimize: isProd,
				caseSensitive: true,
				removeComments: true,
				minifyCSS: isProd,
				minifyJS: isProd,
				minifyURLs: isProd
			},

            language: packageFile.config.language,
            charset: packageFile.config.charset,
            author: packageFile.author,
            description: packageFile.description,
            keywords: packageFile.keywords.join(),
            pragma: (!isProd ? 'no-cache' : ''),
            expires: (!isProd ? '0' : 'Friday, 25-May-18 00:00:00 GMT'), // Standart: RFC 850.
            cache_control: (isProd ? 'public, max-age: 3600, must-revalidate' : 'no-cache, no-store')
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
		/*
        new FaviconsWebpackPlugin({
            logo: './src/logo.svg',
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
		})
		*/
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ContextReplacementPlugin(
			/@angular(\\|\/)core(\\|\/)/,
		)
	],
    devServer: {
        compress: true, // gzip compression
        host: packageFile.config.host,
        https: false,
        historyApiFallback: true,
        port: process.env.WEBPACK_PORT || packageFile.config.port,
        index: 'index.html', // Index filename
        contentBase: path.join(__dirname, 'dist'), // Output directory
        publicPath: '/', // URL path
        open: false, // Auto open in the browser
        allowedHosts: [
            packageFile.config.host
        ],
		hot: true,
		inline: true,
		progress: true
    }
};


if(isProd) {
    config.plugins.push(
        new ExtractTextPlugin('[name].[hash].css'),
        new UglifyJsPlugin()
    );
}

module.exports = config;
