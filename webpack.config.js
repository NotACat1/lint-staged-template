const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pagesDir = path.resolve(`${__dirname}/src/pages`);

function generateEntries() {
  const entries = {};
  const pages = fs.readdirSync(pagesDir);
  pages.forEach((page) => {
    const entryName = page;
    const entryPath = path.resolve(`${pagesDir}/${page}/script.js`);
    entries[entryName] = entryPath;
  });
  return entries;
}

function generateHtmlPlugins() {
  const pages = fs.readdirSync(pagesDir);
  return pages.map((page) => {
    const template = path.resolve(`${pagesDir}/${page}/index.html`);
    return new HtmlWebpackPlugin({
      template,
      filename: `${page}.html`,
      chunks: [page],
    });
  });
}

module.exports = {
  entry: generateEntries(),
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...generateHtmlPlugins()],
};
