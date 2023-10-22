const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'vehicles',
      path: '/vehicles',
      component: resolve(__dirname, 'pages/vehicles.vue'),
    })
  })
}

export default PortfolioModule
