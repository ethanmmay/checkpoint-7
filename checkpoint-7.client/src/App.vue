<template>
  <header>
    <Navbar :bug="bug" />
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { bugService } from './services/BugService'

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      bugService.getBugs()
    })
    return {
      appState: computed(() => AppState),
      bug: computed(() => AppState.bugDetails)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
textarea {
  min-height: 350px;
}
</style>
