<template>
  <div class="recommend-music">
    <h2 class="title">推荐新歌</h2>
    <SongList :songList="songs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, reactive, toRefs } from 'vue'
import SongList from '@/components/SongList/index.vue'

export default defineComponent({
  components: { SongList },
  setup () {
    const state = reactive({
      songs: []
    })

    // 获取推荐新音乐
    async function getNewSongs () {
      // const res = await ctx.$api.getNewSongs()
      // state.songs = res.res
    }

    onMounted(() => {
      getNewSongs()
    })
    onUpdated(() => {})
    return { ...toRefs(state), getNewSongs }
  }
})
</script>

<style scoped>

</style>
