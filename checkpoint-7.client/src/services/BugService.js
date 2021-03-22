/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
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
        this.getBugs()
      })
    } catch (err) {
      logger.error('Couldnt create Bug', err)
    }
  }

  setBugDetails(bugId) {
    AppState.bugDetails = AppState.bugs.filter(b => b.id === bugId)[0]
  }
}

export const bugService = new BugService()
