<template>
  <div class="empty flex-column">
    <img src="../../assets/images/empty.png" alt="" />
    <p>{{ emptyText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    emptyText: {
      type: String,
      default: '哎呀，这里什么都没有~'
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang='scss' scoped>
.empty {
  width: 100%;

  img {
    width: 300px;
  }
}
</style>
