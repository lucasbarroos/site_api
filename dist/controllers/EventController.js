"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Event = require('../schemas/Event'); var _Event2 = _interopRequireDefault(_Event);

class EventController {
  /**
    * @api {post} /event Create a event
    * @apiName CreateEvent
    * @apiGroup Event
    *
    * @apiSuccess {Object} Event created.
    */
   async store (req, res) {
    try {
      const event = await _Event2.default.create(req.body)
      return res.json(event)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {put} /event/:id Update a event
    * @apiName UpdateEvent
    * @apiGroup Event
    *
    * @apiParam {String} Event id
    *
    * @apiSuccess {Object} Event updated.
    */
   async update (req, res) {
    try {
      const event = await _Event2.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!event) {
        return res.sendStatus(204).send({ message: 'Event not found' })
      }
      return res.json(event)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
   * @api {get} /event/:id Request Event information
   * @apiName GetById
   * @apiGroup Event
   *
   * @apiParam {String} _id Events unique ID.
   *
   * @apiSuccess {Boolean} active Flag to active the Event.
   * @apiSuccess {String} name Name of the Event.
   * @apiSuccess {String} description  Description of the Event.
   * @apiSuccess {Date} date Date of the Event.
   * @apiSuccess {String} logo Logo of the Event.
   * @apiSuccess {String} banner Banner of the Event.
   */
   async get (req, res) {
    try {
      const event = await _Event2.default.findById(req.params.id, { __v: 0, password: 0, createdAt: 0, updatedAt: 0 })
      if (!event) {
        return res.sendStatus(404).send({ message: 'Event not found' })
      }
      return res.json(event)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {get} /events/:page? List of events
    * @apiName GetEvents
    * @apiGroup Event
    *
    * @apiParam {Number} page List page.
    *
    * @apiSuccess {Boolean} active Flag to active the Event.
    * @apiSuccess {String} name Name of the Event.
    * @apiSuccess {String} description  Description of the Event.
    * @apiSuccess {Date} date Date of the Event.
    * @apiSuccess {String} logo Logo of the Event.
    * @apiSuccess {String} banner Banner of the Event.
    */
   async index (req, res) {
    try {
      const page = Number(req.params.page) || 1
      const perPage = req.query.perPage || 20

      await _Event2.default.paginate({}, { page: page, perPage: perPage, select: ['-password', '-createdAt', '-updatedAt', '-__v'] }).then(result => {
        return res.json(result)
      })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {delete} /event/:id Delete a event
    * @apiName DeleteEvent
    * @apiGroup Event
    *
    * @apiParam {String} Event id
    *
    * @apiSuccess {Object} Event deleted.
    */

   async delete (req, res) {
    try {
      const event = await _Event2.default.findByIdAndDelete(req.params.id)
      if (!event) {
        return res.sendStatus(204).send({ message: 'Event not found' })
      }
      return res.json(event)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }
}

exports. default = new EventController()
