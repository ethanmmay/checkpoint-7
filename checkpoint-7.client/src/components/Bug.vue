<template>
  <div class="row px-4" v-if="bug">
    <div class="col-12">
      <div class="row">
        <!-- Table Headers -->
        <div class="col-3 d-flex justify-content-center align-items-center">
          <h5 class="mb-0 py-1">
            <router-link :to="{name: 'Bug', params: { id: bug.id }}">
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
        <div class="col-3 d-flex justify-content-center align-items-center bd-r">
          <h5 class="mb-0 py-1">
            {{ bug.updatedAt }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bug: { type: Object, default: undefined }
  },
  setup() {
    return {
    }
  }
}
</script>

<style>

</style>
