"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _tsmongoosepagination = require('ts-mongoose-pagination');













const EventSchema = new (0, _mongoose.Schema)({
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  logo: { type: String },
  banner: { type: String },
  address: {
    street: { type: String },
    number: { type: String },
    neighborhood: { type: String },
    zipcode: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    place: { type: String },
    complement: { type: String }
  },
  tickets: [{
    title: { type: String },
    description: { type: String }
  }],
  lots: [{
    title: { type: String },
    amount: { type: Number },
    value: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date }
  }]
}, { timestamps: true })

EventSchema.plugin(_tsmongoosepagination.mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface


exports. default = _mongoose.model.call(void 0, 'Event', EventSchema)
