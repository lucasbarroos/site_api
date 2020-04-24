"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _tsmongoosepagination = require('ts-mongoose-pagination');











const CompanySchema = new (0, _mongoose.Schema)({
  active: { type: Boolean, default: true },
  name: { type: String },
  slug: { type: String },
  document: { type: String },
  phone: { type: String },
  logo: { type: String },
  owner: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

CompanySchema.plugin(_tsmongoosepagination.mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface


exports. default = _mongoose.model.call(void 0, 'Company', CompanySchema)
