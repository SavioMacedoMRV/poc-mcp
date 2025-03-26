const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const deps = require('./package.json').dependencies
const path = require('path')
const {compilerOptions} = require('./tsconfig.json')

const {ModuleFederationPlugin} = webpack.container
const buildDate = new Date().toLocaleString()

function getAliases() {
  const paths = {}
  Object.entries(compilerOptions.paths).forEach(([alias, [value]]) => {
    paths[alias.slice(0, -2)] = path.resolve(__dirname, value.slice(0, -2))
  })

  return paths
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  let envFile = isProduction ? '.env.prod' : '.env'
  envFile = env.QA ? '.env.qa' : envFile

  const envPath = path.resolve(__dirname, envFile)
  const envVars = require('dotenv').config({path: envPath}).parsed || {}

  return {
    entry: './src/index.ts',
    cache: false,
    mode: argv.mode || 'development',
    devtool: isProduction ? false : 'inline-source-map',
    devServer: {
      port: 3002,
      open: true,
      hot: false,
      liveReload: true,
      historyApiFallback: true,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: getAliases(),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
      ],
    },

    plugins: [
      new webpack.EnvironmentPlugin({BUILD_DATE: buildDate}),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
      new ModuleFederationPlugin({
        name: 'template',
        filename: 'remoteEntry.js',
        exposes: {
          './app': './src/bootstrap',
        },
        shared: {
          ...deps,
          react: {singleton: true, eager: true, requiredVersion: deps.react},
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
          'react-router-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-router-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/logo.svg',
      }),
    ],
  }
}
