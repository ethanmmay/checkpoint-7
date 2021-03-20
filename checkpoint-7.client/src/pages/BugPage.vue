<template>
  <BugDetails :bug="state.bugs.filter(b => b.id === route.params.id)[0]" />
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
    onMounted(() => {
      bugService.setBugDetails(route.params.id)
    })
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    return {
      route,
      state
    }
  }
}
</script>
