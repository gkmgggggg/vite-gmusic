<template>
  <div class="rank-wrap container">
    <div class="module">
      <h2 class="title flex-row">云音乐特色榜</h2>
      <SongSheet :sheetList="featureList" />
    </div>
    <div class="module">
      <h2 class="title flex-row">全球媒体榜</h2>
      <SongSheet :sheetList="globalList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive } from 'vue'
import SongSheet from '@/components/SongSheet/index.vue'

export default defineComponent({
  components: {
    SongSheet
  },
  setup () {
    const state = reactive({
      ranks: [],
      fullscreenLoading: false
    })

    // 获得排行榜数据
    async function getToplist () {
      // const res = await ctx.$api.getToplist()
      // if (res.code === 200) {
      //   state.ranks = res.res
      // }
    }
    const featureList = computed(() => state.ranks.slice(0, 4))
    const globalList = computed(() => state.ranks.slice(4, state.ranks.length))

    onMounted(() => {
      getToplist()
    })

    return { getToplist, state, featureList, globalList }
  }
})
</script>

<style scoped>

</style>
