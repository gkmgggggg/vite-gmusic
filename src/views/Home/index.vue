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
// import { getBanner } from '@/api/demo'

export default defineComponent({
  name: 'Home',
  components: {
    Banner,
    RecommendSongs,
    RecommendMusic,
    RecommendSinger
  },
  setup () {
    console.log(basicApi)
    const state = reactive({
      banner: [
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' },
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' },
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' },
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' },
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' },
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' },
        { imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg' }
      ]
    })

    // 获取banner数据
    const getBanner = async () => {
      try {
        const res = await basicApi.getBanner()
        console.log(res)
        state.banner = res.data
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getBanner()
      // console.log(getBanner())
    })

    return { ...toRefs(state) }
  }
})
</script>

<style scoped>

</style>
