export default {
  target: 'static',
  generate: {
    fallback: true,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - center-invest-dock',
    title: 'center-invest-dock',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    // script: [
    //   {
    //     src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    //     type: 'text/javascript',
    //   },
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;800&display=swap',
      },
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/apex-chart.js', mode: 'client' },

    '@/plugins/axios',

    '@/plugins/api',

    { src: '@/plugins/notification/index', mode: 'client' },
    { src: '@/plugins/scrollIntoView', mode: 'client' },
    { src: '@/plugins/confirmation/index', mode: 'client' },

    // { src: '@/plugins/jquery/jquery.js', mode: 'client' },
    // { src: '@/plugins/jquery/jquery.selectareas.min', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  styleResources: {
    scss: ['./assets/vars/index.scss'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@/modules/auth/index.js',
    '@/modules/grade-requests/index.js',
    '@/modules/questions/index.js',
    '@/modules/tests/index.js',
    '@/modules/specializations/index.js',

    // '@/modules/users/index.js',
    // '@/modules/products/index.js',
    // '@/modules/categories/index.js',
    // '@/modules/warehouse/index.js',
    // '@/modules/trade/index.js',
    // '@/modules/fuel-types/index.js',
    // '@/modules/vehicles/index.js',
  ],
  // router: {
  //   middleware: ['auth'],
  // },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
          global: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: 'http://194.87.144.227:8000/auth/token',
            method: 'post',
          },
          refresh: {
            url: 'http://194.87.144.227:8000/auth/token/refresh',
            method: 'post',
          },
          user: {
            url: 'http://194.87.144.227:8000/auth/users/me',
            method: 'get',
          },
          logout: false,
        },
        // Options
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },
    scopeKey: 'role',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.scss',
    // '~/assets/jquery/selectareas/jquery.selectareas.css',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // axios: {
  //   proxy: true,
  // },
  proxy: {
    // '/api': {
    //   target: process.env.BASE_URL,
    //   changeOrigin: false,
    //   pathRewrite: {
    //     '^/api': '',
    //   },
    // },
    // '/api': process.env.BASE_URL,
    // '/auth': process.env.BASE_URL,
  },
  vuetify: {
    optionsPath: './vuetify.options.js',
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: false,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3,
  //       },
  //     },
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {},

  build: {
    extend(config, { isClient }) {
      config.module.rules.push({
        test: /\.(cjs|mjs)$/,
        exclude: {
          and: [/node_modules/],
          not: [/pathe/],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'ie 11' }]],
          },
        },
      })
    },
  },
}
