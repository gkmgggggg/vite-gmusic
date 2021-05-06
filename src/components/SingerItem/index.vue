<template>
  <li @click="toSinger(item)">
    <div class="cover">
      <div class="image">
        <img :src="item.img1v1Url + '?param=200y200'" alt="" />
        <!-- <el-image
          :key="item.img1v1Url + '?param=200y200'"
          :src="item.img1v1Url + '?param=200y200'"
          lazy
        >
          <div slot="placeholder" class="image-slot flex-center flex-column">
            <i class="iconfont niceicon-3"></i>
            <p>加载中<span class="dot">...</span></p>
          </div>
          <div slot="error" class="image-slot flex-center">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image> -->
      </div>
    </div>
    <div class="info">
      <p class="name">{{ item.name }}</p>
      <p class="count" v-if="item.musicSize">单曲数{{ item.musicSize }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    item: {
      type: Object
    }
  },
  setup () {
    const router = useRouter()

    // 跳转歌手页面
    function toSinger (item:any) {
      router.push({
        name: 'singerDetail',
        query: {
          id: item.id
        }
      })
    }
    return { toSinger }
  }
})
</script>

<style scoped>

</style>
