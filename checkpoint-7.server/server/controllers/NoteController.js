import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await noteService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await noteService.edit(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await noteService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
