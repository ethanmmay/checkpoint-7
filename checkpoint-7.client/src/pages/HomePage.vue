<template>
  <div class="col-12 my-5">
    <div class="row d-flex align-items-center">
      <h4 class="d-inline-flex mr-3 mb-0">
        Current Bugs
      </h4>
      <button class="btn btn-dark no-radius" @click="createBug()" v-if="state.currentUser.isAuthenticated">
        Report
      </button>
    </div>
    <div class="row">
      <div class="col-12 borders px-4 mt-3 py-2">
        <div class="row">
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
                <i class="fa fa-chevron-down" aria-hidden="true" @click="sortBugs()"></i>
              </div>
              <div class="col-3 d-flex justify-content-center align-items-center theader">
                <h5 class="mb-0 py-1">
                  Last Modified
                </h5>
              </div>
            </div>
          </div>
        </div>
        <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
      </div>
    </div>
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
      bugs: computed(() => AppState.bugs),
      currentUser: computed(() => AppState.user)
    })
    return {
      state,
      createBug() {
        bugService.createBug()
      },
      sortBugs() {
        bugService.sortBugs()
      }
    }
  }
}
</script>

<style lang="scss">
.col-3 {
  border: 0px solid var(--dark);
  border-right: 0px;
  border-top: 0px;
}

.borders {
  border: 1px solid black;
}

.no-radius {
  border-radius: 0;
  width: 120px
}

.theader {
  border-top: 0px solid var(--dark);
  border-bottom: 2px solid var(--danger);
}

.h5 {
  margin-bottom: 0vh !important;
}

.fa {
  font-size: 10pt;
  margin-left: 2vh;
}

.fa:hover {
  cursor: pointer;
  transform: scale(0.9);
}
</style>
