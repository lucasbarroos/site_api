"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config()

console.clear()
switch (process.env.ENVIRONMENT) {
  case 'production': {
    _app2.default.listen(process.env.PROD_SERVER_PORT, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Production Application initialized on port: ${process.env.PROD_SERVER_PORT}`)
      }
    })
    break
  }
  case 'development': {
    _app2.default.listen(process.env.DEV_SERVER_PORT, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Development Application initialized on port: ${process.env.DEV_SERVER_PORT}`)
      }
    })
    break
  }
  case 'test': {
    _app2.default.listen(process.env.TEST_SERVER_PORT, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Test Application initialized on port: ${process.env.TEST_SERVER_PORT}`)
      }
    })
    break
  }
}
