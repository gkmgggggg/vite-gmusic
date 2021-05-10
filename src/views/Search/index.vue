<template>
  <div class="search-wrap">
    <div class="banner layer">
      <div class="search-inner">
        <div class="search-box flex-row">
          <input
            v-model="keyword"
            maxlength="128"
            type="text"
            placeholder="搜索音乐/MV/歌单/歌手"
            class="search"
          />
          <i class="iconfont nicesearch-o search-icon" @click="search(1)"></i>
        </div>
        <div
          class="list"
          :class="!isKeyword ? 'hot' : ''"
          style="display: none"
        >
          <div
            class="item"
            v-if="searchResult.songs && searchResult.songs.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont niceyinfu3"></i> 单曲
            </div>
            <ul>
              <li v-for="item of searchResult.songs" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.artists && searchResult.artists.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont niceicon-4"></i> 歌手
            </div>
            <ul>
              <li v-for="item of searchResult.artists" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.albums && searchResult.albums.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont niceRaidobox-selectedRai1"></i> 专辑
            </div>
            <ul>
              <li v-for="item of searchResult.albums" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.playlists && searchResult.playlists.length > 0"
          >
            <div class="title flex-row">
              <i
                class="iconfont nicebofangliebiao24"
                style="font-size: 20px"
              ></i>
              歌单
            </div>
            <ul>
              <li v-for="item of searchResult.playlists" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="main container">
      <div class="tab flex-row">
        <h2>搜索结果</h2>
        <a :class="type === 1 ? 'active' : ''" @click="changeType(1)">单曲</a>
        <a :class="type === 2 ? 'active' : ''" @click="changeType(2)">歌手</a>
        <a :class="type === 3 ? 'active' : ''" @click="changeType(3)">歌单</a>
      </div>
      <div class="content">
        <ArtistList :songs="songs" :isPerson="isPerson" v-if="type === 1" />
        <ul class="singer-list" v-if="type === 2">
          <SingerItem v-for="item of singers" :key="item.id" :item="item" />
        </ul>
        <SongSheet :sheetList="playList" v-if="type == 3" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  onUpdated,
  reactive,
  toRefs
} from 'vue'
import ArtistList from '@/components/ArtistList/index.vue'
import SingerItem from '@/components/SingerItem/index.vue'
import SongSheet from '@/components/SongSheet/index.vue'
import { useRouter } from 'vue-router'
import { basicApi } from '@/api/index'

export default ({
  components: {
    ArtistList,
    SingerItem,
    // AlbumList,
    SongSheet
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword || this.keyword.split(' ').join('').length === 0) {
        this.searchResult = {}
        return
      }
      this.timer = setTimeout(() => {
        this.search(this.type)
      }, 100)
    },
    $route (newObj, oldObj) {
      if (newObj.query.keyword !== oldObj.query.keyword) {
        this.keyword = newObj.query.keyword
        this.search(1)
      }
    }
  },
  setup () {
    const state = reactive({
      keyword: '',
      searchResult: {},
      limit: 30,
      offset: 0,
      type: 1, // 1：单曲 2：专辑  3：歌手 4：歌单 5：MV
      isPerson: true,
      songs: [],
      singers: [],
      albums: [],
      videos: [],
      playList: [],
      loading: false
    })
    const router = useRouter()
    const isKeyword = computed(() => state.keyword.split(' ').join('').length === 0)
    // 更改搜索类型
    function changeType (type) {
      state.type = type
      search(type)
    }
    // 搜索
    function search (type) {
      basicApi.search({ keyword: state.keyword, limit: state.limit, offset: state.offset, type: state.type }).then((res) => {
        if (res.status) {
          switch (type) {
            case 1: {
              for (const i of res.data) {
                i.duration = parseFloat(i.duration / 1000)
              }
              state.songs = res.data
              break
            }
            case 2: state.singers = res.data; break
            case 3: state.playList = res.data; break
            default: break
          }
        }
      })
    }
    onMounted(() => {
      const { keyword } = router.currentRoute.value.query
      if (keyword) {
        state.keyword = keyword
        search(1)
      }
    })
    onUpdated(() => {})
    return { ...toRefs(state), changeType, isKeyword, search }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.search-wrap {
  margin-top: -20px;

  .banner {
    width: 100%;
    height: 250px;
    background: url("../../assets/images/personal.jpg");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;

    .search-inner {
      width: 720px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .search-box {
        position: relative;
        z-index: 10;
        padding-left: 8px;
        border-radius: 2px;
        background: #f5f5f5;

        input {
          display: inline-block;
          height: 54px;
          flex: 1;
          line-height: 54px;
          border: none;
          margin-right: 24px;
          padding-left: 10px;
          background: #f5f5f5;
        }

        .search-icon {
          font-size: 20px;
          padding: 16px;
          cursor: pointer;
        }
      }

      .list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 18px 0 15px;
        transition-property: top;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        opacity: 0;
        z-index: 0;
        box-shadow: 0 10px 30px 0 rgba(65, 67, 70, 0.08);
        border-radius: 4px;

        &.hot {
          top: 110%;
          opacity: 1;
        }

        .item {
          .title {
            height: 30px;
            padding: 0 18px;
            font-size: 12px;
            color: #909399;
            line-height: 30px;

            i {
              font-size: 18px;
              margin-right: 5px;
              font-weight: bold;
              color: $color-theme;
            }
          }
        }

        ul {
          li {
            height: 38px;
            line-height: 38px;
            padding: 0 18px;
            font-weight: 300;
            background: #ffffff;
            transition: background 0.1s;
            cursor: pointer;

            &:hover {
              background: #f5f5f5;
            }
          }
        }
      }
    }
  }

  .main {
    .tab {
      display: flex;
      align-items: baseline;
      margin-top: 43px;
      margin-bottom: 42px;

      h2 {
        font-size: 22px;
        font-weight: 600;
        line-height: 30px;
        margin-right: 40px;
      }

      a {
        position: relative;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        margin-right: 34px;
        font-weight: 300;
        color: #333;
        z-index: 1;
        cursor: pointer;

        &.active {
          &::after {
            position: absolute;
            content: "";
            left: 0;
            bottom: 1px;
            width: 100%;
            height: 6px;
            background: $color-theme;
            opacity: 0.5;
            z-index: -1;
          }
        }
      }
    }

    .content {
      .singer-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        margin: 30px -15px 0;
      }
    }
  }
}
</style>
