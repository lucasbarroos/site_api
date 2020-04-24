import app from './app'
import dotenv from 'dotenv'
dotenv.config()

console.clear()
switch (process.env.ENVIRONMENT) {
  case 'production': {
    app.listen(process.env.PROD_SERVER_PORT, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Production Application initialized on port: ${process.env.PROD_SERVER_PORT}`)
      }
    })
    break
  }
  case 'development': {
    app.listen(process.env.DEV_SERVER_PORT, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Development Application initialized on port: ${process.env.DEV_SERVER_PORT}`)
      }
    })
    break
  }
  case 'test': {
    app.listen(process.env.TEST_SERVER_PORT, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Test Application initialized on port: ${process.env.TEST_SERVER_PORT}`)
      }
    })
    break
  }
}
