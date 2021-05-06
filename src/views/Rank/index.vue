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
import { playlistApi } from '@/api/index'

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
      const res = await playlistApi.getRank()
      state.ranks = res.data
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

<style lang="scss" scoped>
$color-theme: #fa2800;

.rank-wrap {
  .module {
    .title {
      position: relative;
      padding-left: 15px;
      margin-bottom: 20px;

      &::before {
        content: "";
        width: 3px;
        height: 20px;
        background: $color-theme;
        position: absolute;
        left: 0;
        top: 2px;
      }
    }
  }
}
</style>
