const fs = require('fs')
const path = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vresentation',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  plugins: [
    { src: '~/plugins/router-sync' },
    { src: '~/plugins/mousetrap', ssr: false }
  ],
  env: {
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
},
generate: {
  routes: async function () {
    const list = fs.readdirSync(path.resolve('./static/talks'))
    console.log(list)
    return list.map((dirname) => {
      return dirname
    })
  },
}
}

