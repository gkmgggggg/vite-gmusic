<template>
  <div class="recommend-music">
    <h2 class="title">推荐新歌</h2>
    <SongList :songList="songs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, reactive, toRefs } from 'vue'
import SongList from '@/components/SongList/index.vue'
import { songApi } from '@/api/index'

export default defineComponent({
  components: { SongList },
  setup () {
    const state = reactive({
      songs: []
    })

    // 获取推荐歌曲
    async function getNewSongs () {
      const res = await songApi.getRecommendSong()
      state.songs = res.data
    }

    onMounted(() => {
      getNewSongs()
    })
    onUpdated(() => {})
    return { ...toRefs(state), getNewSongs }
  }
})
</script>

<style lang="scss" scoped>
.recommend-music {
  .title {
    text-align: left;
    margin: 0 0 15px 0;
  }
}
</style>
