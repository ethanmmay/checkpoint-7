import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Cannot find Note with that ID')
    }
    return note
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async edit(id, userId, body) {
    const noteToEdit = await this.findById(id)
    if (noteToEdit.creator.id === userId) { // Checking if User owns this Note
      await dbContext.Notes.findByIdAndUpdate(id, body)
      const note = await this.findById(id)
      return note
    } else {
      throw new BadRequest('Users ID and Creators ID do not match.')
    }
  }

  async delete(id, userId) {
    const noteToDelete = await this.findById(id)
    if (noteToDelete.creator.id === userId) { // Checking if User owns this Note
      await dbContext.Notes.findByIdAndDelete(id)
      return 'Note Deleted'
    } else {
      throw new BadRequest('Users ID and Creators ID do not match.')
    }
  }
}

export const noteService = new NoteService()
