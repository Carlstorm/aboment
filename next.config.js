// module.exports = {
//     async rewrites() {
//         return [
//           {
//             source: '/api/*',
//             destination: 'https://api.example.com/:path*',
//           },
//         ]
//       },
//   };

module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        })

        return config
    }
}