"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _User = require('../schemas/User'); var _User2 = _interopRequireDefault(_User);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class UserController {
  /**
  * @api {post} /user Create a user
  * @apiName CreateUser
  * @apiGroup User
  *
  * @apiSuccess {Object} user User created.
  */
   async store (req, res) {
    try {
      const user = await _User2.default.create(req.body)
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
  * @api {put} /user/:id Update a user
  * @apiName UpdateUser
  * @apiGroup User
  *
  * @apiParam {String} User id
  *
  * @apiSuccess {Object} user User updated.
  */
   async update (req, res) {
    try {
      const user = await _User2.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!user) {
        return res.sendStatus(204).send({ message: 'User not found' })
      }
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
 * @api {get} /user/:id Request User information
 * @apiName GetById
 * @apiGroup User
 *
 * @apiParam {String} _id Users unique ID.
 *
 * @apiSuccess {Boolean} active Flag to active the User.
 * @apiSuccess {String} name Firstname of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} login Login of the User.
 * @apiSuccess {String} password Password of the User.
 * @apiSuccess {String} role Role of the User.
 */
   async get (req, res) {
    try {
      const user = await _User2.default
        .findById(req.params.id, { __v: 0, password: 0, createdAt: 0, updatedAt: 0 })
      if (!user) {
        return res.sendStatus(404).send({ message: 'User not found' })
      }
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
  * @api {get} /users/:page? List of users
  * @apiName GetUsers
  * @apiGroup User
  *
  * @apiParam {Number} page List page.
  *
  * @apiSuccess {Boolean} active Flag to active the User.
  * @apiSuccess {String} name Firstname of the User.
  * @apiSuccess {String} email  Email of the User.
  * @apiSuccess {String} login Login of the User.
  * @apiSuccess {String} password Password of the User.
  * @apiSuccess {String} role Role of the User.
  */
   async index (req, res) {
    try {
      const page = Number(req.params.page) || 1
      const perPage = req.query.perPage || 20

      await _User2.default.paginate({}, { page: page, perPage: perPage, select: ['-password', '-createdAt', '-updatedAt', '-__v'] }).then(result => {
        return res.json(result)
      })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
  * @api {delete} /user/:id Delete a user
  * @apiName DeleteUser
  * @apiGroup User
  *
  * @apiParam {String} User id
  *
  * @apiSuccess {Object} user User deleted.
  */

   async delete (req, res) {
    try {
      const user = await _User2.default.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.sendStatus(204).send({ message: 'User not found' })
      }
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
  * @api {post} /login Login
  * @apiName Login
  * @apiGroup Authentication
  *
  * @apiParam {String} login The login to access.
  * @apiParam {String} password The password to access.
  *
  * @apiSuccess {Object} user The user logged.
  * @apiSuccess {String} token Application Token.
  */

   async login (req, res) {
    try {
      const { login, password } = req.body
      if (!login || !password) {
        return res.sendStatus(400).send({ message: 'Missing fields!' })
      }

      const user = await _User2.default.findOne({ login: login }, { __v: 0, createdAt: 0, updatedAt: 0 })

      if (!user) {
        return res.sendStatus(401).send({ message: 'User does not exist!' })
      }

      if (!await _bcryptjs2.default.compare(password, user.password)) {
        return res.status(401).send({ message: 'Incorrect login!' })
      }

      user.password = undefined

      res.status(200).send({
        user,
        token: _jsonwebtoken2.default.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: 86400
        })
      })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }
}

exports. default = new UserController()
