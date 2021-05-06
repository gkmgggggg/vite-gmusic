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
import { singerApi } from '@/api/index'

export default defineComponent({
  components: {
    SingerItem
  },
  setup () {
    const state = reactive({
      singer: []
    })

    // 获取热门歌手
    async function getRecommendSinger () {
      const res = await singerApi.getRecommendSinger()
      state.singer = res.data
    }

    onMounted(() => {
      getRecommendSinger()
    })
    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.recommend-singer {
  margin-top: 40px;

  .title {
    text-align: left;
    margin: 0 0 15px 0;
  }

  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 0px -15px 0;
  }
}
</style>
