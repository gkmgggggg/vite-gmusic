<template>
  <layout>
    <template v-slot:home-body>
      <div class="mainBody">
        <router-view></router-view>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@/Layout/index.vue'

export default defineComponent({
  name: 'Home',
  components: { Layout },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.mainBody{
  height: 100%;
  padding: 20px 0;
}
</style>
