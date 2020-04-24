"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Company = require('../schemas/Company'); var _Company2 = _interopRequireDefault(_Company);

class CompanyController {
  /**
    * @api {post} /company Create a company
    * @apiName CreateCompany
    * @apiGroup Company
    *
    * @apiSuccess {Object} Company created.
    */
   async store (req, res) {
    try {
      const company = await _Company2.default.create(req.body)
      return res.json(company)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {put} /company/:id Update a company
    * @apiName UpdateCompany
    * @apiGroup Company
    *
    * @apiParam {String} Company id
    *
    * @apiSuccess {Object} Company updated.
    */
   async update (req, res) {
    try {
      const company = await _Company2.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!company) {
        return res.sendStatus(204).send({ message: 'Company not found' })
      }
      return res.json(company)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
   * @api {get} /company/:id Request Company information
   * @apiName GetById
   * @apiGroup Company
   *
   * @apiParam {String} _id Companys unique ID.
   *
   * @apiSuccess {Boolean} active Flag to active the Company.
   * @apiSuccess {String} name Name of the Company.
   * @apiSuccess {String} slug  Slug of the Company.
   * @apiSuccess {String} document Document of the Company.
   * @apiSuccess {String} phone Phone of the Company.
   * @apiSuccess {String} logo Logo of the Company.
   * @apiSuccess {Array}  owner Owners of the Company.
  */
   async get (req, res) {
    try {
      const company = await _Company2.default
        .findById(req.params.id, { __v: 0, password: 0, createdAt: 0, updatedAt: 0 })
        .populate('owner')
      if (!company) {
        return res.sendStatus(404).send({ message: 'Company not found' })
      }
      return res.json(company)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {get} /companies/:page? List of companies
    * @apiName GetCompanies
    * @apiGroup Company
    *
    * @apiParam {Number} page List page.
    *
    * @apiSuccess {Boolean} active Flag to active the Company.
    * @apiSuccess {String} name Name of the Company.
    * @apiSuccess {String} slug  Slug of the Company.
    * @apiSuccess {String} document Document of the Company.
    * @apiSuccess {String} phone Phone of the Company.
    * @apiSuccess {String} logo Logo of the Company.
    * @apiSuccess {Array} owner Owners of the Company.
    */
   async index (req, res) {
    try {
      const page = Number(req.params.page) || 1
      const perPage = req.query.perPage || 20

      await _Company2.default.paginate({}, { page: page, perPage: perPage, populate: ['owner'], select: ['-password', '-createdAt', '-updatedAt', '-__v'] }).then(result => {
        return res.json(result)
      })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }

  /**
    * @api {delete} /company/:id Delete a company
    * @apiName DeleteCompany
    * @apiGroup Company
    *
    * @apiParam {String} Company id
    *
    * @apiSuccess {Object} Company deleted.
    */

   async delete (req, res) {
    try {
      const company = await _Company2.default.findByIdAndDelete(req.params.id)
      if (!company) {
        return res.sendStatus(204).send({ message: 'Company not found' })
      }
      return res.json(company)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).send({ message: 'Internal server error' })
    }
  }
}

exports. default = new CompanyController()
