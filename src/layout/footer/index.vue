<template>
  <div class="footer">
    <div class="container">
      <p class="title">nicemusic</p>
      <!-- <p class="desc">nicemusic</p> -->
      <div class="social flex-row">
        <a href="">
          <span class="flex-center">
            <i class="iconfont nicewangyiyunyinle"></i>
          </span>
        </a>
        <a href="">
          <span class="flex-center">
            <i class="iconfont niceicon_githubb"></i>
          </span>
        </a>
        <a href="">
          <span class="flex-center">
            <i class="iconfont icon-CN_bilibili"></i>
          </span>
        </a>
        <a href="">
          <span class="flex-center">
            <i class="iconfont icon-CN_zhihu"></i>
          </span>
        </a>
        <a href="">
          <span class="flex-center">
            <i class="iconfont icon-CN_tencentQQ"></i>
          </span>
        </a>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <p>
          <span class="mr5">Copyright © 2020-3020</span>
          <a href="https://www.lxhcool.cn">nicemusic 演示站</a>
          <span>. Designed by</span>
          <a href="https://www.lxhcool.cn" target="_blank">GKMG</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;

.footer {
  width: 100%;
  background: #161e27;
  .container {
    padding: 1rem 0;

    .title {
      position: relative;
      font-size: 0.9375rem;
      letter-spacing: 1px;
      color: #fff;
      padding: 0 0.5rem;
      text-align: center;
    }

    .desc {
      font-size: 0.8125rem;
      line-height: 1.8;
      color: #6d7685;
    }

    .social {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        position: relative;
        border-radius: 50%;
        text-align: center;
        width: 34px;
        height: 34px;
        font-size: 1rem;
        background-color: #232a31;
        border-color: #232a31;
        color: #6d7685;
        display: flex;
        font-weight: 400;
        margin: 0 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
        }

        &:hover {
          background: #ddd;
        }
      }
    }
  }

  .copyright {
    padding: 1rem 0;
    border-top: 1px solid #232a31;
    .container {
      padding: 0;
      color: #6d7685;
      font-size: 0.8125rem;
      p{
        text-align: center;
      }
      a {
        color: #6d7685;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
