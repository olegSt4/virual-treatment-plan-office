const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

function cssLoaderConfig() {
    return{
        loader: "css-loader",
        options: {
            import: true,
            url: false,
            importLoaders: 1,
            sourceMap: true,
        }
    };
}

module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `css/[name].css`,
                chunkFilename: `css/[name].css`
            }),
        ]
    };
};
