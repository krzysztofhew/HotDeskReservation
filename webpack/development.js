module.exports = {
    devServer: {
        contentBase: './public',
        port: 3000,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test:/\.module\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                            }
                        }

                    }
                ]
            }
        ]
    }
}
