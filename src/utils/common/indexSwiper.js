export function _Swiper (oswiper) {
  const oSwiper = oswiper
  const oPre = oSwiper.getElementsByClassName('pre')[0]
  const oNext = oSwiper.getElementsByClassName('next')[0]
  const oLeft = oSwiper.getElementsByClassName('left')[0]
  const oRight = oSwiper.getElementsByClassName('right')[0]
  const aLi = oSwiper.querySelectorAll('li')
  const aSpan = document.querySelectorAll('.banner-span')

  const aName = []
  let currentIndex = 0
  for (const i of aLi) {
    aName.push(i.classList[0])
  }

  swichTo()
  setCurrent()
  // eslint-disable-next-line no-use-before-define
  clearInterval(timer)
  // eslint-disable-next-line no-var
  var timer = setInterval(() => {
    nextPic()
  }, 3000)

  oSwiper.onmouseover = function () {
    clearInterval(timer)
    oPre.style.display = 'block'
    oNext.style.display = 'block'
    oLeft.onclick = function () {
      prePic()
    }
    oRight.onclick = function () {
      nextPic()
    }
  }

  oSwiper.onmouseout = function () {
    clearInterval(timer)
    timer = setInterval(() => {
      nextPic()
    }, 3000)
    oPre.style.display = 'none'
    oNext.style.display = 'none'
  }

  function swichTo () {
    for (let i = 0; i < aSpan.length; i++) {
      aSpan[i].index = i
      aSpan[i].onclick = function () {
        for (let j = 0; j < aSpan.length; j++) {
          aSpan[j].className = ''
        }
        this.className = 'action'
        if (this.index > currentIndex) {
          for (let i = currentIndex, length = this.index; i < length; i++) {
            swichNext()
          }
        } else {
          for (let i = this.index, length = currentIndex; i < length; i++) {
            swichPre()
          }
        }
        addClass()
        currentIndex = this.index
      }
    }
  }

  function setCurrent () {
    for (let i = 0, length = aSpan.length; i < length; i++) {
      aSpan[i].className = ''
    }
    aSpan[currentIndex].className = 'action'
  }
  /** 将数组所有元素向后移一位 */
  function swichNext () {
    aName.unshift(aName[aName.length - 1]) // 将类名数组最后一个元素复制一份插入数组最前面
    aName.pop() //
  }
  /** 将数组所有元素向前移一位 */
  function swichPre () {
    aName.push(aName[0])
    aName.shift()
  }

  function addClass () {
    for (let i = 0; i < aLi.length; i++) {
      aLi[i].setAttribute('class', aName[i])
    }
  }

  function prePic () {
    swichPre()
    addClass()
    currentIndex--
    if (currentIndex < 0) currentIndex = 5
    if (currentIndex > 5) currentIndex = 0
    setCurrent()
  }

  function nextPic () {
    swichNext()
    addClass()
    currentIndex++
    if (currentIndex < 0) currentIndex = 5
    if (currentIndex > 5) currentIndex = 0
    setCurrent()
  }
}
