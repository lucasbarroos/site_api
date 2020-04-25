import { Request, Response } from 'express'
import Message from '../schemas/Message'

class MessageController {
  /**
      * @api {message} /message Create a message
      * @apiName CreateMessage
      * @apiGroup Message
      *
      * @apiSuccess {Object} message Message created.
      */
  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const message = await Message.create(req.body)
      return res.json(message)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }
}

export default new MessageController()
