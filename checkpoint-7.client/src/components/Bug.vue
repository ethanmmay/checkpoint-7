<template>
  <div class="row" v-if="bug">
    <div class="col-12">
      <div class="row py-2" :class="state.bugs.indexOf(bug) % 2 === 1 ? 'bg-alternate' : ''">
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            <router-link :to="{name: 'Bug', params: { id: bug.id }}" class="underline">
              {{ bug.title }}
            </router-link>
          </h5>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            {{ bug.creator.name.substring(0, bug.creator.name.indexOf('@')) }}
          </h5>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center" :class=" bug.closed ? 'text-danger' : 'text-success' ">
          <h5 class="mb-0 py-1">
            {{ bug.closed ? 'Closed' : 'Open' }}
          </h5>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            {{ bug.updatedAt.substring(5, 7) + '-' + bug.updatedAt.substring(8, 10) + '-' + bug.updatedAt.substring(0, 4) }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  props: {
    bug: { type: Object, default: undefined }
  },
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.underline {
  color: black;
  text-decoration: none;
}
.underline:hover {
  text-decoration: underline;
}
.bg-alternate {
  background-color: rgb(219, 219, 219);
}
</style>
