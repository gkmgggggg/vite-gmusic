<template>
  <div class="progress-bar-wrap" @mouseup.self="progressMouseUp($event)">
    <div class="progress-bar" ref="progressBar" @click="progressClick">
      <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div
          class="progress-btn"
          ref="progressBtn"
          @mousedown.prevent="progressMouseDown($event)"
          @mouseup="progressMouseUp($event)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
const progressBtnWidth = 12
export default {
  data () {
    return {
      playProcess: 0
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent (newPercent) {
      this.setProgressOffset(newPercent)
    }
  },
  setup (props, context) {
    const progress = ref(null)
    const progressBar = ref(null)
    const state = reactive({
      playProcess: 0,
      touch: {}
    })
    // 鼠标按下
    function progressMouseDown (e) {
      state.touch.initiated = true
      state.touch.startX = e.pageX
      state.touch.left = progress.value.clientWidth
      document.onmousemove = function (e) {
        const deltaX = e.pageX - state.touch.startX
        const offsetWidth = Math.min(
          progressBar.value.clientWidth - progressBtnWidth,
          Math.max(0, state.touch.left + deltaX)
        )
        if (offsetWidth > progressBar.value.clientWidth) {
          console.log('xxxx')
        }
        offset(offsetWidth)
      }
    }
    // 鼠标放开
    function progressMouseUp (e) {
      if (e.button === 0) {
        if (document.onmousemove == null) {
          return
        }
        document.onmousemove = null
        document.onmouseup = null
        state.touch.initiated = false
        triggerPercent()
      }
    }
    function triggerPercent () {
      context.emit('percentchange', getPercent())
    }
    function offset (offsetWidth) {
      progress.value.style.width = `${offsetWidth}px`
    }
    function getPercent () {
      const barWidth = progressBar.value.clientWidth - progressBtnWidth
      return progress.value.clientWidth / barWidth
    }
    // 点击控制进度
    function progressClick (e) {
      const rect = progressBar.value.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left - 6
      offset(offsetWidth)
      triggerPercent()
    }
    // 设置进度条位置
    function setProgressOffset (percent) {
      if (percent >= 0 && !state.touch.initiated) {
        const barWidth = progressBar.value.clientWidth - progressBtnWidth
        const offsetWidth = percent * barWidth
        offset(offsetWidth)
      }
    }
    onMounted(() => {})
    return {
      props,
      context,
      progress,
      progressBar,
      progressMouseDown,
      progressMouseUp,
      triggerPercent,
      offset,
      getPercent,
      progressClick,
      setProgressOffset,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.progress-bar-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.progress-bar {
  position: relative;
  width: 100%;
  flex: 1;
  height: 3px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  cursor: pointer;
  margin: 0 25px;

  .bar-inner {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;

    .progress {
      width: 0px;
      background: $color-theme;
      height: 3px;
      border-radius: 2px;
    }

    .progress-btn {
      position: absolute;
      z-index: 100;
      right: -12px;
      width: 12px;
      height: 12px;
      top: -4.5px;
      background: $color-theme;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
      transition: all 0.3s;
      border-radius: 50%;

      &::after {
        position: absolute;
        content: " ";
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
      }

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
