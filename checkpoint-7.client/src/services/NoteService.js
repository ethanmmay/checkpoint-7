/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { bugService } from './BugService'

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
            Swal.showValidationMessage('Please enter a body')
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
        bugService.getNotesByBugId(route.params.id)
      })
    } catch (err) {
      logger.error('Couldnt create Note', err)
    }
  }

  async deleteNote(note) {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await api.delete('api/notes/' + note.id)
          bugService.getNotesByBugId(note.bug)
          Swal.fire(
            'Deleted!',
            'Your note has been deleted.',
            'success'
          )
        }
      })
    } catch (error) {
      logger.log(error)
    }
  }
}

export const noteService = new NoteService()
