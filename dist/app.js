'use strict'; function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }Object.defineProperty(exports, '__esModule', { value: true }); const _express = require('express'); const _express2 = _interopRequireDefault(_express)
const _cors = require('cors'); const _cors2 = _interopRequireDefault(_cors)
const _mongoose = require('mongoose'); const _mongoose2 = _interopRequireDefault(_mongoose)
const _routes = require('./routes'); const _routes2 = _interopRequireDefault(_routes)

// Put dotenv global
const _dotenv = require('dotenv'); const _dotenv2 = _interopRequireDefault(_dotenv)
_dotenv2.default.config()

class App {
  constructor () {
    this.express = _express2.default.call(void 0)

    this.middlewares()
    this.database()
    this.routes()
  }

  middlewares () {
    this.express.use(_express2.default.json())
    this.express.use(_cors2.default.call(void 0))
  }

  database () {
    switch (process.env.ENVIRONMENT) {
      case 'production': {
        const dbUrl = `mongodb+srv://${process.env.PROD_DB_USER}:${process.env.PROD_DB_PASSWORD}@${process.env.PROD_DB_HOST}/${process.env.PROD_DB_NAME}?ssl=true&authSource=admin&w=majority`
        _mongoose2.default.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }, (error) => {
          if (error) { console.log(error) }
          console.log('Development Mongodb Connected')
        })
        break
      }
      case 'development': {
        const dbUrl = `mongodb+srv://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_HOST}/${process.env.DEV_DB_NAME}?ssl=true&authSource=admin&w=majority`
        _mongoose2.default.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }, (error) => {
          if (error) { console.log(error) }
          console.log('Development Mongodb Connected')
        })
        break
      }
      case 'test': {
        const dbUrl = `mongodb+srv://${process.env.TEST_DB_USER}:${process.env.TEST_DB_PASSWORD}@${process.env.TEST_DB_HOST}/${process.env.TEST_DB_NAME}?ssl=true&authSource=admin&w=majority`
        _mongoose2.default.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }, (error) => {
          if (error) { console.log(error) }
          console.log('Development Mongodb Connected')
        })
        break
      }
    }
  }

  routes () {
    this.express.use(_routes2.default)
  }
}

exports.default = new App().express
