module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: "gatsby-source-wordpress",
    //   options: {
    //     /*
    //      * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
    //      * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
    //      */
    //     baseUrl: "salehin.ipage.com/igortest/gatsby_cpt_test",
    //     // The protocol. This can be http or https.
    //     protocol: "http",
    //     // Indicates whether the site is hosted on wordpress.com.
    //     // If false, then the assumption is made that the site is self hosted.
    //     // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
    //     // If your site is hosted on wordpress.org, then set this to false.
    //     hostingWPCOM: false,
    //     // If useACF is true, then the source plugin will try to import the WordPress ACF Plugin contents.
    //     // This feature is untested for sites hosted on wordpress.com.
    //     // Defaults to true.
    //     useACF: true,
    //     verboseOutput: true,
    //     // Set how many pages are retrieved per API request.
    //     perPage: 100,
    //     concurrentRequests: 10,
    //     // Set WP REST API routes whitelists
    //     // and blacklists using glob patterns.
    //     // Defaults to whitelist the routes shown
    //     // in the example below.
    //     // See: https://github.com/isaacs/minimatch
    //     // Example:  `["/*/*/comments", "/yoast/**"]`
    //     // ` will either include or exclude routes ending in `comments` and
    //     // all routes that begin with `yoast` from fetch.
    //     // Whitelisted routes using glob patterns
    //     // includedRoutes: [
    //     //   "**/categories",
    //     //   "**/posts",
    //     //   "**/pages",
    //     //   "**/media",
    //     //   "**/tags",
    //     //   "**/taxonomies",
    //     //   "**/users",
    //     // ],
    //     // Set this to keep media sizes.
    //     // This option is particularly useful in case you need access to
    //     // URLs for thumbnails, or any other media detail.
    //     // Defaults to false
    //     // keepMediaSizes: false,
    //     // // use a custom normalizer which is applied after the built-in ones.
    //     // normalizer: function({ entities }) {
    //     //   return entities
    //     // },
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
