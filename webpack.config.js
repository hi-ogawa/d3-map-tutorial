var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./app/index.js",
    output: {
        path: process.env.NODE_ENV === "production" ? "./dist" : "./app",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/,
                query: {presets: ['es2015']}
            },
            {test: /\.scss$/, loaders: ["style", "css", "sass"]},
            {test: /\.jade$/, loader: "jade"},
            {test: /\.json$/, loader: "json"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "d3 map tutorial"
        })
    ]
};
