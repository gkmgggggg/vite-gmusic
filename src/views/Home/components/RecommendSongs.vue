<template>
  <div class="recommend-songs">
    <h2 class="title">推荐歌单</h2>
    <SongSheet :sheetList="sheetList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import SongSheet from '@/components/SongSheet/index.vue'
import { playlistApi } from '@/api/index'

export default defineComponent({
  components: {
    SongSheet
  },
  setup () {
    const state = reactive({
      limit: 24,
      sheetList: []
    })

    // 获取首页推荐歌单
    const getRecommendPlayList = async () => {
      const res = await playlistApi.getRecommendedPlayList()
      state.sheetList = res.data
    }

    // 获取首页推荐歌单
    onMounted(() => {
      getRecommendPlayList()
    })
    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.recommend-songs {
  margin-top: 40px;
  .title {
    text-align: left;
    margin: 0 0 15px 0;
  }
}
</style>
