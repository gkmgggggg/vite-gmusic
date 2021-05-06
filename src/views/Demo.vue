<template>
  <div>
    Home
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
// import { basicApi } from '../api/index'

export default defineComponent({
  setup () {
    const store = useStore()
    store.dispatch('countPlus')
    console.log(store.getters.count)

    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
