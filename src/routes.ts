import { Router } from 'express'
// import Auth from './middlewares/Auth'
import PostController from './controllers/PostController'
import MessageController from './controllers/MessageController'
import AttachmentController from './controllers/AttachmentController'
import multer from 'multer'
import multerConfig from './config/multer'

const routes = Router()

routes.post('/message', MessageController.store)

routes.post('/post', PostController.store)
routes.put('/post', PostController.update)
routes.get('/post/:id', PostController.get)
routes.get('/posts/:page', PostController.index)
routes.delete('/post/:id', PostController.delete)

// To attachment schema
routes.post('/attachment', multer(multerConfig).single('file'), AttachmentController.store)
routes.put('/attachment/:id', AttachmentController.update)
routes.get('/attachment/:id', AttachmentController.get)
routes.get('/attachments/:page?', AttachmentController.index)
routes.delete('/useattachmentr/:id', AttachmentController.delete)

export default routes
