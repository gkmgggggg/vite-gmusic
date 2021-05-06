<template>
  <div class="mv-box">
    <ul class="mv-list" v-if="mvs.length > 0">
      <li v-for="item of mvs" :key="item.id" :class="item.isLive ? 'live' : ''">
        <div class="cover">
          <div class="image">
            <img :src="item.imgurl + '?param=325y197'" />
          </div>
          <div class="count">
            <i class="arrow"></i>
            <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
          </div>
          <div class="action">
            <button
              class="play flex-center"
              title="播放"
              v-if="!item.isLive"
              @click="toDetail(item.id, item.type)"
            >
              <i class="iconfont nicebofang1"></i>
            </button>
            <button
              class="play flex-center"
              title="播放"
              v-else
              @click="toLive(item.id)"
            >
              <i class="iconfont nicebofang1"></i>
            </button>
          </div>
          <div class="foot">
            <p>{{ item.artist.name }}</p>
            <p>{{ utils.formatTime(item.duration) }}</p>
          </div>
        </div>
        <div class="info">
          <h2 class="title ellipsis">{{ item.name }}</h2>
        </div>
      </li>
    </ul>
    <!-- <nice-empty v-else></nice-empty> -->
    <div v-if="loadStatus" class="load-bottom">
      <NiceLoading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import NiceLoading from '@/components/NiceLoading.vue'
import utils from '@/utils/utils'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    mvs: {
      type: Array
    },
    loadStatus: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    type: {
      type: String
    }
  },
  components: { NiceLoading },
  setup (props) {
    const router = useRouter()

    // 直播跳转
    function toLive (id:string) {
      const url = `https://iplay.163.com/live?id=${id}`
      window.open(url, '_blank')
    }
    // 视频详情
    function toDetail (id:string) {
      // this.stopPlay();
      if (typeof id === 'number' || id.length < 10) {
        router.push({
          name: 'mvDetail',
          query: {
            id
          }
        })
      } else {
        router.push({
          name: 'videoDetail',
          query: {
            id
          }
        })
      }
    }

    const isLoading = computed(() => !props.loading)
    const isNoMore = computed(() => props.loading || (props as any).noMore)

    return { utils, toLive, toDetail, isLoading, isNoMore }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.mv-box {
  padding: 15px 0;

  .mv-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 -15px;

    li {
      padding: 0 15px 30px;
      flex: 0 0 25%;
      max-width: 25%;

      .cover {
        position: relative;
        z-index: 2;
        padding-top: 56%;
        border-radius: 2px;
        background-color: #000;

        .image {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }

        .count {
          position: absolute;
          right: 16px;
          top: 1px;
          height: 24px;
          padding-left: 9px;
          background: url("https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png")
            no-repeat 0; // img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
          background-size: cover;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            color: #fff;
          }
          .arrow {
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 0 4px 6px;
            border-color: transparent transparent transparent #ffffff;
            margin-right: 5px;
          }

          &:after {
            content: "";
            position: absolute;
            right: -14px;
            top: 0;
            width: 14px;
            height: 24px;
            background: url("https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png")
              no-repeat 100%; // img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
            background-size: cover;
          }
        }

        .action {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);

          .play {
            width: 32px;
            height: 32px;
            padding: 0;
            border: none;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
            background-color: $color-theme;

            i {
              font-size: 12px;
            }
          }
        }

        .foot {
          width: 100%;
          height: 35px;
          background: rgba(0, 0, 0, 0.6);
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;

          p {
            color: #ffffff;
          }
        }

        &:hover {
          .action {
            display: flex;
          }
        }
      }

      .info {
        margin-top: 15px;

        .title {
          font-size: 14px;
          font-weight: 500;
          display: block;
          line-height: 1.3;
        }

        .author {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }

      &.live {
        .cover {
          .foot {
            background: rgba(250, 40, 0, 0.75);
          }
        }
      }
    }
  }
}
</style>
