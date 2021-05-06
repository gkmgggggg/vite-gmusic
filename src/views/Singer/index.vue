<template>
  <div class="singer-wrap container">
    <div class="filter">
      <ul class="tag-lang">
        <li
          v-for="item of state.langs"
          :key="item.value"
          :class="state.lang == item.value ? 'active' : ''"
          @click="chooseType('lang', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang tag-type">
        <li
          v-for="item of state.classifys"
          :key="item.value"
          :class="state.classify == item.value ? 'active' : ''"
          @click="chooseType('classify', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <LoadMore @scroll-state="load">
      <ul class="singer-list">
        <SingerItem v-for="item of state.singers" :key="item.id" :item="item" />
      </ul>
    </LoadMore>
    <div v-if="state.loading" class="load-bottom">
      <nice-loading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, reactive } from 'vue'
import SingerItem from '@/components/SingerItem/index.vue'
import NiceLoading from '@/components/NiceLoading/index.vue'
import LoadMore from '@/components/LoadMore/index.vue'

export default defineComponent({
  components: {
    SingerItem,
    NiceLoading,
    LoadMore
  },
  setup () {
    const state = reactive({
      // 语种
      lang: -1,
      langs: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 7,
          label: '华语'
        },
        {
          value: 96,
          label: '欧美'
        },
        {
          value: 8,
          label: '日本'
        },
        {
          value: 16,
          label: '韩国'
        },
        {
          value: 0,
          label: '其他'
        }
      ],
      // 分类
      classify: -1,
      classifys: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '男歌手'
        },
        {
          value: 2,
          label: '女歌手'
        },
        {
          value: 3,
          label: '乐队'
        }
      ],
      // 字母A_Z
      en: -1,
      ens: [],
      // 请求参数
      params: {
        // 返回数量
        limit: 40,
        // 偏移数量
        offset: 0,
        // 分类
        type: -1,
        // 语种
        area: -1
        // 字母A_Z
        // initial: -1,
      },
      // 歌手列表
      singers: [],
      // 是否显示加载动画
      loading: false,
      // 是否还有数据
      loadStatus: true
    })
    // 获取筛选列表
    function getEn () {
      const ens = []
      for (let i = 0; i < 26; i++) {
        ens.push({
          value: String.fromCharCode(97 + i),
          label: String.fromCharCode(65 + i)
        })
      }
      ens.unshift({
        value: -1,
        label: '热门'
      })
      ens.push({
        value: 0,
        label: '其他'
      })
      // state.ens = ens
    }
    // 选择歌手分类
    function chooseType (type:string, val:number) {
      if (type === 'lang') {
        state.lang = val
        state.params.area = val
      } else if (type === 'classify') {
        state.classify = val
        state.params.type = val
      }
      // else if (type == "en") {
      //   state.en = val;
      //   state.params.initial = val;
      // }
      state.params.offset = 0
      state.loadStatus = true
      state.singers = []
      getSingerList()
    }
    // 获取歌手列表
    async function getSingerList () {
      // try {
      //   state.loadStatus = false
      //   const res = await ctx.$api.getSingerList(state.params)
      //   if (res.code === 200) {
      //     // console.log(res);
      //     state.singers = state.singers.concat(res.res)
      //     if (res.more) {
      //       state.loading = true
      //       state.loadStatus = true
      //       state.params.offset += 40
      //     } else {
      //       state.loading = false
      //     }
      //   }
      // } catch (error) {
      //   console.log(error)
      //   // this.$message.error(error);
      // }
    }
    // 加载更多
    function load () {
      if (state.loadStatus) {
        setTimeout(() => {
          getSingerList()
        }, 1000)
      }
    }

    onMounted(() => {
      getEn()
      getSingerList()
    })
    onUpdated(() => {})
    return { state, getEn, chooseType, getSingerList, load }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;

.singer-wrap {
  margin-top: -20px;

  li {
    &:hover {
      color: $color-theme;
      transition: all 0.4s;
    }
  }

  .tag-en {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    li {
      width: 28px;
      height: 28px;
      margin-right: 14px;
      text-align: center;
      line-height: 29px;
      border-radius: 50%;
      font-size: 13px;
      color: #333333;
      cursor: pointer;

      &:first-child,
      &.last-child {
        width: 56px;
        border-radius: 14px;
      }

      &.active {
        background: $color-theme;
        font-weight: 700;
        color: #ffffff;
      }

      &:hover {
        color: $color-theme;
        transition: all 0.4s;
      }
    }
  }

  .tag-lang {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;

    li {
      width: 56px;
      height: 28px;
      line-height: 29px;
      font-size: 13px;
      text-align: center;
      border-radius: 14px;
      cursor: pointer;
      margin-right: 6px;

      &.active {
        background: $color-theme;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }

  .tag-type {
    li {
      width: auto;
      padding: 0 15px;
    }
  }

  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
  }
}
</style>
