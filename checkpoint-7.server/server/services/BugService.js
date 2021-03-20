import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Cannot find Bug with that ID')
    }
    return bug
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return bug
  }

  async edit(id, userId, body) {
    const bugToEdit = await this.findById(id)
    if (bugToEdit.creator.id === userId && bugToEdit.closed === false) { // Checking if User owns this Bug
      await dbContext.Bugs.findByIdAndUpdate(id, body)
      const bug = await this.findById(id)
      return bug
    } else {
      throw new BadRequest('Users ID and Creators ID do not match.')
    }
  }

  async delete(id, userId) {
    const bugToDelete = await this.findById(id)
    if (bugToDelete.creator.id === userId) { // Checking if User owns this Bug
      await dbContext.Bugs.findByIdAndUpdate(id, { closed: true })
      const bug = await this.findById(id)
      return bug
    } else {
      throw new BadRequest('Users ID and Creators ID do not match.')
    }
  }
}

export const bugService = new BugService()
