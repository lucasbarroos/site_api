import { Request, Response } from 'express'
import Post from '../schemas/Post'

class PostController {
  /**
    * @api {post} /post Create a post
    * @apiName CreatePost
    * @apiGroup Post
    *
    * @apiSuccess {Object} post Post created.
    */
  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post.create(req.body)
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {put} /post/:id Update a post
    * @apiName UpdatePost
    * @apiGroup Post
    *
    * @apiParam {String} Post id
    *
    * @apiSuccess {Object} post Post updated.
    */
  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!post) {
        return res.sendStatus(204).send({ message: 'Post not found' })
      }
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
   * @api {get} /post/:id Request Post information
   * @apiName GetById
   * @apiGroup Post
   *
   * @apiParam {String} _id Posts unique ID.
   *
   * @apiSuccess {Boolean} active Flag to active the Post.
   * @apiSuccess {String} title Title of the Post.
   * @apiSuccess {String} description Description of the Post.
   * @apiSuccess {String} text Text of the Post.
   * @apiSuccess {String} image Image of the Post.
   * @apiSuccess {Date} date Date of the Post.
   */
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post
        .findById(req.params.id, { __v: 0, createdAt: 0, updatedAt: 0 })
      if (!post) {
        return res.sendStatus(404).send({ message: 'Post not found' })
      }
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {get} /posts/:page? List of posts
    * @apiName GetPosts
    * @apiGroup Post
    *
    * @apiParam {Number} page List page.
    *
    * @apiSuccess {Boolean} active Flag to active the Post.
    * @apiSuccess {String} title Title of the Post.
    * @apiSuccess {String} description Description of the Post.
    * @apiSuccess {String} text Text of the Post.
    * @apiSuccess {String} iamge Image of the Post.
    * @apiSuccess {Date} date Date of the Post.
    */
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.params.page) || 1
      const perPage = req.query.perPage || 20

      await Post.paginate({}, { page: page, perPage: perPage, select: ['-createdAt', '-updatedAt', '-__v'] }).then(result => {
        return res.json(result)
      })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {delete} /post/:id Delete a post
    * @apiName DeletePost
    * @apiGroup Post
    *
    * @apiParam {String} Post id
    *
    * @apiSuccess {Object} post Post deleted.
    */

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post.findByIdAndDelete(req.params.id)
      if (!post) {
        return res.sendStatus(204).send({ message: 'Post not found' })
      }
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }
}

export default new PostController()
