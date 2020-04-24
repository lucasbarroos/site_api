"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
// import Auth from './middlewares/Auth'
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _AttachmentController = require('./controllers/AttachmentController'); var _AttachmentController2 = _interopRequireDefault(_AttachmentController);
var _CompanyController = require('./controllers/CompanyController'); var _CompanyController2 = _interopRequireDefault(_CompanyController);
var _EventController = require('./controllers/EventController'); var _EventController2 = _interopRequireDefault(_EventController);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

const routes = _express.Router.call(void 0, )

// To user login
routes.post('/login', _UserController2.default.login)

// To user schema
routes.post('/user', _UserController2.default.store)
routes.put('/user/:id', _UserController2.default.update)
routes.get('/user/:id', _UserController2.default.get)
routes.get('/users/:page?', _UserController2.default.index)
routes.delete('/user/:id', _UserController2.default.delete)

// To event schema
routes.post('/event', _EventController2.default.store)
routes.put('/event/:id', _EventController2.default.update)
routes.get('/event/:id', _EventController2.default.get)
routes.get('/events/:page?', _EventController2.default.index)
routes.delete('/event/:id', _EventController2.default.delete)

// To company schema
routes.post('/company', _CompanyController2.default.store)
routes.put('/company/:id', _CompanyController2.default.update)
routes.get('/company/:id', _CompanyController2.default.get)
routes.get('/companies/:page?', _CompanyController2.default.index)
routes.delete('/company/:id', _CompanyController2.default.delete)

// To attachment schema
routes.post('/attachment', _multer2.default.call(void 0, _multer4.default).single('file'), _AttachmentController2.default.store)
routes.put('/attachment/:id', _AttachmentController2.default.update)
routes.get('/attachment/:id', _AttachmentController2.default.get)
routes.get('/attachments/:page?', _AttachmentController2.default.index)
routes.delete('/useattachmentr/:id', _AttachmentController2.default.delete)

exports. default = routes
