<template>
  <div class="load-more">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    // 获取滚动条当前的位置
    getScrollTop () {
      let scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    },
    // 获取当前可视范围的高度
    getClientHeight () {
      let clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      }
      return clientHeight
    },

    // 获取文档完整的高度
    getScrollHeight () {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
    }
  },
  created () {},
  mounted () {
    // 滚动事件触发
    const self = this
    window.onscroll = function () {
      if (
        self.getScrollTop() + self.getClientHeight() >=
        self.getScrollHeight() - 0.5
      ) {
        console.log('数据刷新！！！！！！！！！！！！！！！')
        self.$emit('scroll-state', true)
      }
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>
