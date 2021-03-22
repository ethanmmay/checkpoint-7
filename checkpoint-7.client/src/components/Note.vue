<template>
  <div class="row px-4">
    <div class="col-12">
      <div class="row">
        <!-- Table Headers -->
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            {{ note.creator.name.substring(0, note.creator.name.indexOf('@')) }}
          </h5>
        </div>
        <div class="col-6 d-flex align-items-center text-left">
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
      currentUser: computed(() => AppState.user)
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
</style>
