"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _tsmongoosepagination = require('ts-mongoose-pagination');










const AttachmentSchema = new (0, _mongoose.Schema)({
  active: { type: Boolean, default: true },
  name: { type: String },
  type: { type: String },
  path: { type: String },
  size: { type: Number },
  url: { type: String }
}, { timestamps: true })

AttachmentSchema.plugin(_tsmongoosepagination.mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface


exports. default = _mongoose.model.call(void 0, 'Attachment', AttachmentSchema)
