"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Auth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.query.token

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' })
  }

  _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) return res.status(401).send({ error: 'Token invalid' })
    req.userId = decoded.id
    return next()
  })
}

exports. default = Auth
