<template>
  <div class="playlist-wrap container">
    <div class="filter shadow">
      <div class="title flex-center" @click="openFilter">
        {{ currentCat }}
        <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
        <transition name="fade">
          <div class="filter-box shadow" v-if="showFilter">
            <div class="item" v-for="item of cateList" :key="item.key">
              <h2>
                <i class="iconfont" :class="item.icon"></i>{{ item.type }}
              </h2>
              <ul>
                <li
                  :class="currentCat == sub.name ? 'active' : ''"
                  v-for="sub of item.list"
                  :key="sub.name"
                  @click="chooseCat(sub.name)"
                >
                  {{ sub.name }}
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <div class="hot-tag flex-row">
        <p>热门标签：</p>
        <ul class="flex-center">
          <li
            v-for="item of hotCategories"
            :key="item.id"
            :class="currentCat == item.name ? 'active' : ''"
            @click="chooseCat(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <SongSheet :sheetList="playList" />
    <div class="page-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="limit"
        background
        hide-on-single-page
        layout="prev, pager, next"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import SongSheet from '@/components/SongSheet/index.vue'
import { playlistApi } from '@/api/index'

export default defineComponent({
  components: {
    SongSheet
  },
  setup () {
    const state = reactive({
      categories: {},
      hotCategories: [],
      cateList: [],
      playList: [],
      showFilter: false,
      pageTotal: 1200,
      currentPage: 1,
      limit: 40,
      offset: 0,
      currentCat: '全部',
      sortType: 'hot',
      typeList: [
        {
          key: 0,
          value: '语种',
          icon: 'niceyuyan'
        },
        {
          key: 1,
          value: '风格',
          icon: 'nicefengge'
        },
        {
          key: 2,
          value: '场景',
          icon: 'nicekafeidengdai'
        },
        {
          key: 3,
          value: '情感',
          icon: 'niceqingganqingshu'
        },
        {
          key: 4,
          value: '主题',
          icon: 'nicepifugexinghuazhuti-xianxing'
        }
      ],
      fullscreenLoading: false
    })

    function handleSizeChange (val:number) {
      state.limit = val
      state.offset = state.limit * state.currentPage
      getPlayList()
    }
    function handleCurrentChange (val:number) {
      state.currentPage = val
      state.offset = (val - 1) * state.limit
      getPlayList()
    }
    function openFilter () {
      state.showFilter = !state.showFilter
    }
    // 选择最新或者热门
    function chooseType (type:string) {
      state.currentPage = 1
      state.sortType = type
      getPlayList()
    }
    // 选择分类
    function chooseCat (cat:string) {
      state.currentPage = 1
      state.offset = 0
      state.currentCat = cat
      getPlayList()
    }

    // 获取歌单分类
    async function getCatList () {
      const res = await playlistApi.getTag()
      state.categories = ['语种', '风格', '场景', '情感', '主题'];
      (state.cateList as any) = categoryGroup(res.data, 'category')
    }
    // 获取热门歌单分类
    async function getHotlist () {
      const res = await playlistApi.getTag(-1)
      state.hotCategories = res.data
    }
    // 获取歌单 默认全部
    async function getPlayList () {
      state.fullscreenLoading = true
      const param = {
        type: state.currentCat,
        limit: state.limit,
        offset: state.offset
      }
      const res = await playlistApi.getPlayList(param)
      console.log(res)
      state.playList = res.data.data
      state.pageTotal = res.data.total
      state.fullscreenLoading = false
    }
    // 根据分类进行分组
    function categoryGroup (list:any, field:any) {
      const obj = {}
      for (let i = 0; i < list.length; i++) {
        for (const item in list[i]) {
          if (item === field) {
            obj[list[i][item]] = {
              list: obj[list[i][field]] ? obj[list[i][field]].list : []
            }
          }
        }
        obj[list[i][field]].list.push(list[i])
      }
      const att = []

      for (const item in obj) {
        let type = ''
        let category = ''
        let icon = ''
        state.typeList.map((jitem) => {
          if (jitem.key == obj[item].list[0].category) {
            type = jitem.value
            category = jitem.key
            icon = jitem.icon
          }
        })
        att.push({
          type,
          category,
          icon,
          list: obj[item].list
        })
      }
      return att
    }

    function getData () {
      getHotlist()
      getCatList()
      getPlayList()
    }

    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      openFilter,
      chooseType,
      chooseCat
    }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-leave-active {
  transition: all 0.5s;
}

.playlist-wrap {
  .filter {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0px 5px 5px;

    .title {
      width: auto;
      height: 100%;
      padding: 0 5px 0 15px;
      background: $color-theme;
      border-radius: 5px 0px 5px 5px;
      color: #ffffff;
      cursor: pointer;
      position: relative;
      margin-right: 15px;
      position: relative;

      &::after {
        content: "";
        width: 1px;
        height: 20px;
        margin-left: 12px;
        background: #e7e7e7;
        opacity: 0;
      }

      > i {
        transform: rotate(90deg);
        margin-left: 10px;
        font-size: 18px;
      }

      .filter-box {
        width: 720px;
        height: 400px;
        overflow-y: scroll;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        color: #000;
        position: absolute;
        right: -631px;
        top: 50px;
        z-index: 100;
        padding: 15px 10px 0 16px;

        .item {
          margin-bottom: 20px;

          h2 {
            display: flex;
            align-items: center;
            font-size: 15px;
            margin-bottom: 15px;
            color: #161e27;

            i {
              font-size: 18px;
              margin-right: 5px;
              margin-top: -1px;
            }
          }

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              padding: 8px 18px;
              background: #f7f7f7;
              border-radius: 16px;
              margin: 0 10px 10px 0;
              cursor: pointer;
              font-size: 12px;
              color: #161e27;
              transition: all 0.4s;

              &:hover {
                color: #fff;
                background: $color-theme;
              }

              &.active {
                color: #fff;
                background: $color-theme;
              }
            }
          }
        }
      }

      // &:hover {
      //   // border: 1px solid #cccccc;
      // }
    }

    .hot-tag {
      flex: 1;

      ul {
        li {
          margin: 0 5px;
          padding-right: 10px;
          cursor: pointer;

          &:hover {
            color: #888;
          }

          &.active {
            color: $color-theme;
          }
        }
      }
    }

    .type {
      display: flex;

      .item {
        margin-left: 20px;
        background: #f7f7f7;
        color: #161e27;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 3px;
        transition: all 0.4s;
        cursor: pointer;

        &.active {
          background: $color-theme;
          color: #fff;

          &:hover {
            color: #fff;
          }
        }

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
