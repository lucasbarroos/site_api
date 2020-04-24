import { Request, Response } from 'express'
import Attachment from '../schemas/Attachment'

class AttachmentController {
  /**
    * @api {post} /attachment Create a attachment
    * @apiName CreateAttachment
    * @apiGroup Attachment
    *
    * @apiSuccess {Object} Attachment created.
    */
  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const file = {
        size: req.file.size,
        path: req.file.path,
        type: req.file.mimetype,
        name: req.file.originalname
      }

      const attachment = await Attachment.create(file)

      await Attachment.findByIdAndUpdate(attachment._id,
        { url: `${process.env.SERVER_HOST}:${process.env.DEV_SERVER_PORT}/attachment/${attachment._id}` },
        { new: true })

      return res.json(attachment)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {put} /attachment/:id Update a attachment
    * @apiName UpdateAttachment
    * @apiGroup Attachment
    *
    * @apiParam {String} Attachment id
    *
    * @apiSuccess {Object} Attachment updated.
    */
  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const attachment = await Attachment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!attachment) {
        return res.sendStatus(204).send({ message: 'Attachment not found' })
      }
      return res.json(attachment)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
   * @api {get} /attachment/:id Request Attachment information
   * @apiName GetById
   * @apiGroup Attachment
   *
   * @apiParam {String} _id Attachments unique ID.
   *
   * @apiSuccess {Boolean} active Flag to active the Attachment.
   * @apiSuccess {String} name Firstname of the Attachment.
   * @apiSuccess {String} email  Email of the Attachment.
   * @apiSuccess {String} login Login of the Attachment.
   * @apiSuccess {String} password Password of the Attachment.
   * @apiSuccess {String} role Role of the Attachment.
   */
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const attachment = await Attachment.findById(req.params.id, { __v: 0, password: 0, createdAt: 0, updatedAt: 0 })
      if (!attachment) {
        return res.sendStatus(404).send({ message: 'Attachment not found' })
      }
      return res.json(attachment)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {get} /attachments/:page? List of attachments
    * @apiName GetAttachments
    * @apiGroup Attachment
    *
    * @apiParam {Number} page List page.
    *
    * @apiSuccess {Boolean} active Flag to active the Attachment.
    * @apiSuccess {String} name Firstname of the Attachment.
    * @apiSuccess {String} email  Email of the Attachment.
    * @apiSuccess {String} login Login of the Attachment.
    * @apiSuccess {String} password Password of the Attachment.
    * @apiSuccess {String} role Role of the Attachment.
    */
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.params.page) || 1
      const perPage = req.query.perPage || 20

      await Attachment.paginate({}, { page: page, perPage: perPage, select: ['-password', '-createdAt', '-updatedAt', '-__v'] }).then(result => {
        return res.json(result)
      })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {delete} /attachment/:id Delete a attachment
    * @apiName DeleteAttachment
    * @apiGroup Attachment
    *
    * @apiParam {String} Attachment id
    *
    * @apiSuccess {Object} Attachment deleted.
    */

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const attachment = await Attachment.findByIdAndDelete(req.params.id)
      if (!attachment) {
        return res.sendStatus(204).send({ message: 'Attachment not found' })
      }
      return res.json(attachment)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }
}

export default new AttachmentController()
