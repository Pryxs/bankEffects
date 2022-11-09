const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif)$/i,
            use: [{
                loader: 'file-loader',
            }],
        }],
      },
    
    // entry: [
    //      './src/image-hover-effect/image-hover-effect.js',
    //      './src/retro-background/retro-background.js',
    // ],
};