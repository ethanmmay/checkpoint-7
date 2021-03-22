<template>
  <div class="row">
    <div class="col-12">
      <div class="row" :class="state.notes.indexOf(note) % 2 === 1 ? 'bg-alternate py-2' : 'py-2'">
        <!-- Table Headers -->
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            <img :src="note.creator.picture" class="pfp-img mr-2" alt="User Picture">
            {{ note.creator.name.substring(0, note.creator.name.indexOf('@')) }}
          </h5>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-center">
          <p class="mb-0 py-1">
            {{ note.body }}
          </p>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center bd-r">
          <h5 class="mb-0 py-1">
            <i class="fa fa-trash-o" aria-hidden="true" @click="deleteNote(note)" v-if="note.creator.name === state.currentUser.name"></i>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { AppState } from '../AppState'
export default {
  props: {
    note: { type: Object, default: undefined }
  },
  setup() {
    const state = reactive({
      currentUser: computed(() => AppState.user),
      notes: computed(() => AppState.notes)
    })
    return {
      deleteNote(note) {
        noteService.deleteNote(note)
      },
      state
    }
  }
}
</script>

<style scoped lang="scss">
.fa {
    font-size: 20pt;
}
.fa:hover {
    cursor: pointer;
    transform: scale(0.8);
}
.bg-alternate {
  background-color: rgb(219, 219, 219);
}
</style>
