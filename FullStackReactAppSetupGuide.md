
# Full Stack React Application Setup Guide

## Step 1: Initialize the Project
- Create a new project directory and navigate into it:
  ```
  mkdir your_project_name
  cd your_project_name
  ```
- Initialize the project with npm:
  ```
  npm init -y
  ```

## Step 2: Install React and ReactDOM
- Install React and ReactDOM libraries:
  ```
  npm install react react-dom
  ```

## Step 3: Set Up Webpack and Babel
- Install necessary tools and loaders for React and Webpack:
  ```
  npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
  ```

## Step 4: Configure Babel
- Create a `.babelrc` file in the project root:
  ```json
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
  ```

## Step 5: Configure Webpack
- Create `webpack.config.js` with the following settings:
  ```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 8080
    }
  };
  ```

## Step 6: Prepare HTML and JS Entry Point
- Create `src` directory, then add `index.html` and `index.js` inside:
  - `index.html` template:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React App</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    </html>
    ```
  - `index.js` setup:
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('app'));
    ```

## Step 7: Set Up the Express Server
- Install Express:
  ```
  npm install express
  ```
- Create `server.js` in the root directory with the following content:
  ```javascript
  const express = require('express');
  const path = require('path');
  const app = express();
  const PORT = 3000;

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  ```

## Step 8: Update package.json Scripts
- Modify scripts to include build and server commands:
  ```json
  "scripts": {
    "start": "webpack serve --mode development --open --config webpack.config.js",
    "build": "webpack --mode production --config webpack.config.js",
    "server": "node server.js"
  }
  ```

## Step 9: Build, Serve and Test
- Build the application:
  ```
  npm run build
  ```
- Start the server and access the application:
  ```
  npm run server
  ```
  Open a web browser and go to `http://localhost:3000`.
