<template>
  <div class="col-12 mt-4">
    <div class="row d-inline-flex justify-content-between w-100">
      <div class="d-inline-flex align-items-center">
        <h6 class="mr-3">
          Title:
        </h6>
        <h3> {{ bug.title }} </h3>
      </div>
      <button class="btn btn-danger">
        Close
      </button>
    </div>
    <div class="row d-inline-flex align-items-center justify-content-between w-100">
      <div class="d-inline-flex align-items-center">
        <h6 class="mr-3">
          Reported By:
        </h6>
        <h3> {{ bug.creator.name.substring(0, bug.creator.name.indexOf('@')) }} </h3>
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
      <h4>Notes</h4>
      <button class="btn btn-success ml-2">
        Add
      </button>
    </div>
    <div class="row px-4 mt-3">
      <div class="col-12">
        <div class="row">
          <!-- Table Headers -->
          <div class="col-3 d-flex justify-content-center align-items-center theader">
            <h5 class="mb-0 py-1">
              Name
            </h5>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center theader">
            <h5 class="mb-0 py-1">
              Message
            </h5>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center theader bd-r">
            <h5 class="mb-0 py-1">
              Delete
            </h5>
          </div>
        </div>
      </div>
    </div>
    <Note v-for="note in state.notes" :key="note.body" :note="note" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  props: {
    bug: { type: Object, default: undefined }
  },
  setup() {
    const state = reactive({
      notes: AppState.notes
    })

    return {
      state
    }
  }

}
</script>

<style lang="scss">
.col-3, .col-6 {
  border: 3px solid var(--dark);
  border-right: 0px;
  border-top: 0px;
}

.theader {
  border-top: 3px solid var(--dark);
  border-bottom: 3px solid var(--danger);
  background-color: var(--primary);
}

.bd-r {
  border-right: 3px solid var(--dark);
}

.h5 {
  margin-bottom: 0vh !important;
}
</style>
