/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { Note } from '../models/Note'
import router from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (err) {
      logger.error('Couldnt load Bugs', err)
    }
  }

  async createBug() {
    try {
      Swal.fire({
        title: 'New Bug',
        html: '<input type="text" id="title" class="swal2-input" placeholder="Enter Bug Name.. "><textarea type="text" id="body" class="swal2-input pt-2" placeholder="Describe the bug..."></textarea>',
        confirmButtonText: 'Report',
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          const body = Swal.getPopup().querySelector('#body').value
          if (!title || !body) {
            Swal.showValidationMessage('Please enter title and body')
          }
          return { title: title, body: body }
        }
      }).then(async(result) => {
        const newBug = {
          title: result.value.title,
          description: result.value.body,
          creatorId: AppState.user.id
        }
        await api.post('api/bugs', newBug)
        AppState.bugs = []
        await this.getBugs()
        router.push({ name: 'Bug', params: { id: AppState.bugs[AppState.bugs.length - 1].id } })
      })
    } catch (err) {
      logger.error('Couldnt create Bug', err)
    }
  }

  async getNotesByBugId(bugId) {
    if (bugId !== '') {
      const res = await api.get(`api/bugs/${bugId}/notes`)
      AppState.notes = res.data.map(n => new Note(n))
    }
  }

  async markClosed(bugId) {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, mark closed.'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await api.delete('api/bugs/' + bugId)
          await this.getBugs()
          Swal.fire(
            'Done!',
            'Your bug has been marked closed.',
            'success'
          )
        }
      })
    } catch (error) {
      logger.log(error)
    }
  }

  sortBugs() {
    AppState.bugs.sort(function(a, b) { return a.closed - b.closed })
  }

  async editBug(bug) {
    try {
      Swal.fire({
        title: 'Edit Bug',
        html: `<input type="text" id="title" class="swal2-input" placeholder="Enter Bug Name.. " value="${bug.title}"><textarea type="text" id="body" class="swal2-input pt-2" placeholder="Describe the bug...">${bug.description}</textarea>`,
        confirmButtonText: 'Save',
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          const body = Swal.getPopup().querySelector('#body').value
          if (!title || !body) {
            Swal.showValidationMessage('Please enter title and body')
          }
          return { title: title, body: body }
        }
      }).then(async(result) => {
        const newBug = {
          title: result.value.title,
          description: result.value.body
        }
        await api.put('api/bugs/' + bug.id, newBug)
        AppState.bugs = []
        await this.getBugs()
      })
    } catch (err) {
      logger.error('Couldnt edit Bug', err)
    }
  }
}

export const bugService = new BugService()
