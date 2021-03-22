/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NoteService {
  async getNotes() {
    try {
      const res = await api.get('api/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (err) {
      logger.error('Couldnt load Notes', err)
    }
  }

  async createNote(route) {
    try {
      Swal.fire({
        title: 'New Note',
        html: '<textarea type="text" id="body" class="swal2-input pt-2" placeholder="Attach note..."></textarea>',
        confirmButtonText: 'Report',
        focusConfirm: false,
        preConfirm: () => {
          const body = Swal.getPopup().querySelector('#body').value
          if (!body) {
            Swal.showValidationMessage('Pleas enter a body')
          }
          return { body: body }
        }
      }).then(async(result) => {
        const newNote = {
          body: result.value.body,
          bug: route.params.id,
          creatorId: AppState.user.id
        }
        await api.post('api/notes', newNote)
        this.getNotes()
      })
    } catch (err) {
      logger.error('Couldnt create Note', err)
    }
  }

  setNoteDetails(noteId) {
    AppState.noteDetails = AppState.notes.filter(b => b.id === noteId)[0]
  }
}

export const noteService = new NoteService()
