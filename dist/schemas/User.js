"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _tsmongoosepagination = require('ts-mongoose-pagination');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);













const UserSchema = new (0, _mongoose.Schema)({
  active: { type: Boolean, default: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  partner: { type: String },
  document: { type: String },
  avatar: { type: String, default: null },
  address: {
    street: { type: String },
    number: { type: Number },
    neighborhood: { type: String },
    zipcode: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    place: { type: String },
    complement: { type: String }
  }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
  this.password = await _bcryptjs2.default.hash(this.password, 10)
  next()
})

UserSchema.plugin(_tsmongoosepagination.mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface


exports. default = _mongoose.model.call(void 0, 'User', UserSchema)
