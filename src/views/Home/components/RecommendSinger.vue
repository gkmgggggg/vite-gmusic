<template>
  <div class="recommend-singer">
    <h2 class="title">推荐歌手</h2>
    <ul class="singer-list">
      <SingerItem v-for="item of singer" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import SingerItem from '@/components/SingerItem/index.vue'

export default defineComponent({
  components: {
    SingerItem
  },
  setup () {
    const state = reactive({
      singer: []
    })

    // 获取热门歌手
    async function getHotSinger () {
      // const res = await ctx.$api.getHotSinger()
      // if (res.code == 200) {
      //   state.singer = res.res
      // }
    }

    onMounted(() => {
      getHotSinger()
    })
    return { ...toRefs(state), getHotSinger }
  }
})
</script>

<style scoped>

</style>
