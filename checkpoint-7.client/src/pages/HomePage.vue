<template>
  <div class="col-12 my-5">
    <div class="row d-flex align-items-center">
      <h4 class="d-inline-flex mr-3 mb-0">
        Bug List
      </h4>
      <button class="btn btn-dark" @click="createBug()">
        Report
      </button>
    </div>
    <div class="row px-4 mt-3">
      <div class="col-12">
        <div class="row">
          <!-- Table Headers -->
          <div class="col-3 d-flex justify-content-center align-items-center theader">
            <h5 class="mb-0 py-1">
              Title
            </h5>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center theader">
            <h5 class="mb-0 py-1">
              Reported By
            </h5>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center theader">
            <h5 class="mb-0 py-1">
              Status
            </h5>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center theader bd-r">
            <h5 class="mb-0 py-1">
              Last Modified
            </h5>
          </div>
        </div>
      </div>
    </div>
    <Bug v-for="bug in state.bugs" :key="bug.title" :bug="bug" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      bugService.getBugs()
    })
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    return {
      state,
      createBug() {
        bugService.createBug()
      }
    }
  }
}
</script>

<style lang="scss">
.col-3 {
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
