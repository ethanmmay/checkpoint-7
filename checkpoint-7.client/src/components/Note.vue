<template>
  <div class="row px-4">
    <div class="col-12">
      <div class="row">
        <!-- Table Headers -->
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            {{ note.body }}
          </h5>
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            {{ note.creator.name.substring(0, note.creator.name.indexOf('@')) }}
          </h5>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center bd-r">
          <h5 class="mb-0 py-1">
            <i class="fa fa-trash" aria-hidden="true" @click="deleteNote(note.id)"></i>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { noteService } from '../services/NoteService'
export default {
  props: {
    note: { type: Object, default: undefined }
  },
  setup() {
    return {
      deleteNote(noteId) {
        noteService.deleteNote(noteId)
      }
    }
  }
}
</script>

<style>

</style>
