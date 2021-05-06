<template>
  <div class="swiper" :ref="swiper" v-if="banner">
    <div class="left">
      <div class="pre">
        <!-- <img src="@/assets/img/swiper/prev.svg" alt /> -->
      </div>
    </div>
    <div class="right">
      <div class="next">
        <!-- <img src="@/assets/img/swiper/next.svg" alt /> -->
      </div>
    </div>
    <div class="imgBox">
      <ul v-if="banner">
        <li
          v-for="(item, index) in banner.slice(0, 5)"
          :key="item.id + index"
          :class="`list${index + 1}`"
        >
          <img :src="item.imageUrl" alt />
        </li>
      </ul>
    </div>
  </div>
  <div class="lineBar">
    <span class="banner-span"></span>
    <span class="banner-span"></span>
    <span class="banner-span"></span>
    <span class="banner-span"></span>
    <span class="banner-span"></span>
    <span class="banner-span"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from 'vue'
import { _Swiper } from '../../../utils/common/indexSwiper'

export default defineComponent({
  name: 'Banner',
  props: {
    banner: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    let itemRefs = ''
    const swiper = (el:any) => {
      itemRefs = el
    }

    onUpdated(() => {
      if (itemRefs) _Swiper(itemRefs)
    })

    return { swiper }
  }
})
</script>

<style lang="css" scoped>
.swiper {
  width: 100%;
  min-width: 800px;
  height: 250px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.imgBox {
  width: 100%;
  height: 100%;
}
.imgBox ul {
  list-style: none;
  position: relative;
}
.imgBox li {
  transition: 0.6s;
  width: 50%;
  min-width: 500px;
  position: absolute;
}
.imgBox img {
  width: 100%;
}
.lineBar {
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: -10px;
}
.lineBar span {
  margin: 0px 5px;
  width: 30px;
  height: 5px;
  border-radius: 2px;
  background: #444;
  cursor: pointer;
}
.list1 {
  transform: scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  animation-duration: 3s;
  opacity: 0.5;
}

.list2 {
  transform: translateX(50%);
  z-index: 2;
  animation-duration: 3s;
  opacity: 1;
}

.list3 {
  transform: translateX(150%) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  animation-duration: 3s;
  opacity: 0.5;
}

.list4 {
  transform: translateX(200%) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  animation-duration: 3s;
  opacity: 0.5;
}

.list5 {
  transform: translateX(250%) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  animation-duration: 3s;
  opacity: 0.5;
}

.list6 {
  transform: translateX(300%) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  animation-duration: 3s;
  opacity: 0.5;
}
.lineBar .action {
  background: green;
}
.pre {
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 999;
  left: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}

.next {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 5px;
  z-index: 999;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}
.pre img,
.next img {
  width: 100%;
}

.left {
  width: 25%;
  height: 100%;
  float: left;
  position: relative;
  z-index: 1;
}

.right {
  width: 25%;
  height: 100%;
  float: right;
  position: relative;
  z-index: 1;
}
</style>
