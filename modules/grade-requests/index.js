const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'grade-requests',
      path: '/grade-requests',
      component: resolve(__dirname, 'pages/index.vue'),
    })
  })
}

export default PortfolioModule
