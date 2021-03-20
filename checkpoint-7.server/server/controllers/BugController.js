import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id/notes', this.getNotesById)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await bugService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNotesById(req, res, next) {
    try {
      res.send(await noteService.find({ bug: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      if (req.body.closed) { // Makes sure user cannot close Bug through Edit
        req.body.closed = false
      }
      res.send(await bugService.edit(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await bugService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
