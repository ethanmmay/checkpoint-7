/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NoteService {
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
}

export const noteService = new NoteService()
