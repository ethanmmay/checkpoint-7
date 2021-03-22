<template>
  <div class="col-12 mt-4">
    <div class="row d-inline-flex justify-content-between w-100">
      <div class="d-inline-flex align-items-center">
        <h6 class="mr-3">
          Title:
        </h6>
        <h2> {{ bug.title }} </h2>
      </div>
      <div class="d-inline-flex" v-if="bug.creator.name === state.currentUser.name && !bug.closed">
        <button class="btn btn-info mr-3 no-radius" @click="editBug(bug)">
          Edit
        </button>
        <button class="btn btn-danger no-radius" @click="markClosed(bug.id)">
          Close
        </button>
      </div>
    </div>
    <div class="row d-inline-flex align-items-center justify-content-between w-100">
      <div class="d-inline-flex align-items-center">
        <h6 class="mr-3">
          Reported By:
        </h6>
        <div class="d-inline-flex align-items-center">
          <img :src="bug.creator.picture" class="pfp-img mr-2" alt="User Picture">
          <h3> {{ bug.creator.name.substring(0, bug.creator.name.indexOf('@')) }} </h3>
        </div>
      </div>
      <h6 class="d-inline-flex align-items-center">
        Status:
        <h4 class="ml-2 mt-2" :class="bug.closed ? 'text-danger' : 'text-success'">
          {{ bug.closed ? 'Closed' : 'Open' }}
        </h4>
      </h6>
    </div>
    <div class="row p-1 border border-dark">
      <p> {{ bug.description }} </p>
    </div>
    <div class="row mt-5">
      <h2 class="mb-0 d-flex align-items-end">
        Notes
      </h2>
      <button class="btn btn-success ml-2 no-radius" @click="createNote()" v-if="state.currentUser.isAuthenticated">
        Add
      </button>
    </div>
    <div class="row">
      <div class="col-12 borders mt-2">
        <div class="row theader py-1">
          <div class="col-12">
            <div class="row">
              <!-- Table Headers -->
              <div class="col-3 d-flex justify-content-center align-items-center">
                <h5 class="mb-0 py-1">
                  Name
                </h5>
              </div>
              <div class="col-6 d-flex justify-content-center align-items-center">
                <h5 class="mb-0 py-1">
                  Message
                </h5>
              </div>
              <div class="col-3 d-flex justify-content-center align-items-center bd-r">
                <h5 class="mb-0 py-1">
                  Delete
                </h5>
              </div>
            </div>
          </div>
        </div>
        <Note v-for="note in state.notes" :key="note.id" :note="note" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'
import { Bug } from '../models/Bug'
export default {
  props: {
    bug: { type: Object, default: () => new Bug() }
  },
  setup(props) {
    const route = useRoute()
    onMounted(() => {
      bugService.getNotesByBugId(route.params.id)
      AppState.bugDetails = props.bug
    })
    const state = reactive({
      notes: computed(() => AppState.notes),
      currentUser: computed(() => AppState.user)
    })
    return {
      state,
      createNote() {
        noteService.createNote(route)
      },
      markClosed(bugId) {
        bugService.markClosed(bugId)
      },
      editBug(bug) {
        bugService.editBug(bug)
      }
    }
  }

}
</script>

<style lang="scss">

.h5 {
  margin-bottom: 0vh !important;
}
.no-radius {
  border-radius: 0;
  width: 120px
}
.pfp-img {
  width: 35px;
  height: 35px;
}
.borders {
  border: 1px solid black;
}
.theader {
  border-bottom: 2px solid var(--danger);
}
</style>
