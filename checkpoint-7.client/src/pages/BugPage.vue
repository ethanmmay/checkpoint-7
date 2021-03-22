<template>
  <BugDetails :bug="state.bugs.filter(b => b.id === route.params.id)[0]" />
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
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
