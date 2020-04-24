import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

// Put dotenv global
import dotenv from 'dotenv'
dotenv.config()

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    switch (process.env.ENVIRONMENT) {
      case 'production': {
        const dbUrl = `mongodb+srv://${process.env.PROD_DB_USER}:${process.env.PROD_DB_PASSWORD}@${process.env.PROD_DB_HOST}/${process.env.PROD_DB_NAME}?ssl=true&authSource=admin&w=majority`
        mongoose.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }, (error) => {
          if (error) { console.log(error) }
          console.log('Production Mongodb Connected')
        })
        break
      }
      case 'development': {
        const dbUrl = `mongodb+srv://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_HOST}/${process.env.DEV_DB_NAME}?ssl=true&authSource=admin&w=majority`
        mongoose.connect(dbUrl, {
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
        mongoose.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }, (error) => {
          if (error) { console.log(error) }
          console.log('Test Mongodb Connected')
        })
        break
      }
    }
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
