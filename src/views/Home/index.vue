<template>
  <div class="home-wrap container">
    <Banner :banner="banner" />
    <RecommendSongs />
    <RecommendMusic />
    <RecommendSinger />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import Banner from './components/Banner.vue'
import RecommendSongs from './components/RecommendSongs.vue'
import RecommendMusic from './components/RecommendMusic.vue'
import RecommendSinger from './components/RecommendSinger.vue'
import { basicApi } from '@/api/index'

export default defineComponent({
  name: 'Home',
  components: {
    Banner,
    RecommendSongs,
    RecommendMusic,
    RecommendSinger
  },
  setup () {
    const state = reactive({
      banner: null
    })

    // 获取banner数据
    const getBanner = async () => {
      const res = await basicApi.getBanner()
      state.banner = res.data
    }

    onMounted(() => {
      getBanner()
    })

    return { ...toRefs(state) }
  }
})
</script>

<style scoped>

</style>
