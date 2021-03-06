<template>
  <div class="list" v-if="sheetList">
    <div
      class="item"
      :class="numClass"
      v-for="item of sheetList"
      :key="item.id"
      @click="toDetail(item)"
    >
      <div class="wrapper">
        <a>
          <div class="cover">
            <div class="image">
              <img :src="item.picUrl || item.coverImgUrl + '?param=300y300'" />
            </div>
            <div class="count">
              <i class="arrow"></i>
              <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="info">
        <h2 class="name ellipsis-two">
          {{ item.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import utils from '@/utils/utils'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    sheetList: {
      type: Array,
      default () {
        return []
      }
    },
    num: {
      type: Number,
      default: 8
    }
  },
  setup (props) {
    const router = useRouter()
    const numClass = computed(() => (props as any).num === 2 ? 'two' : 'eight')

    const toDetail = (item:any) => {
      router.push(`/playlist/detail?id=${item.id}`)
    }

    return { numClass, utils, toDetail }
  }
})
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  .item {
    flex: 0 0 12.5%;
    max-width: 12.5%;
    padding: 0 15px 30px;
    cursor: pointer;

    &.two {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .wrapper {
      position: relative;
      padding-right: 10px;

      &:before,
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: #d9d9d9;
        position: absolute;
        top: 0;
        transition: all 0.4s;
      }

      &:before {
        right: 6px;
        transform: scale(0.85);
        transform-origin: 100% 50%;
        z-index: 2;
        border-radius: 2px;
      }

      &:after {
        right: 4px;
        transform: scale(0.73);
        transform-origin: 100% 50%;
        z-index: 1;
        border-radius: 2px;
        opacity: 0.5;
      }

      .cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 2px;
        background-color: #d9d9d9;

        .image {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 4px;

          &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
              -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
            box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
              inset -1px -1px 0 rgba(0, 0, 0, 0.05);
          }

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
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

          .arrow {
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 0 4px 6px;
            border-color: transparent transparent transparent #ffffff;
            margin-right: 5px;
          }
          span {
            color: #fff;
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
      }
    }

    .info {
      margin-top: 15px;

      .name {
        font-size: 14px;
      }
    }

    &:hover {
      .wrapper {
        &:before,
        &:after {
          background: rgba(250, 40, 0, 0.1);
        }

        &:before {
          right: 4px;
        }

        &:after {
          right: 0px;
        }
      }
    }
  }
}
</style>
