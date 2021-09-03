<script lang="ts" setup>
import { ref } from "@vue/reactivity"
const dom1 = ref<HTMLElement>()
let x: number, y: number;
const isMove = ref(false)
const mousedown = (e: MouseEvent) => {
  if (dom1.value) {
    x = e.clientX - dom1.value.offsetLeft
    y = e.clientY - dom1.value.offsetTop
  }
  isMove.value = true
}
const mousemove = (e: MouseEvent) => {
  if (isMove.value) {
    if (dom1.value) {
      dom1.value.style.left = e.clientX - x + 'px'
      dom1.value.style.top = e.clientY - y + 'px'
    }
  }
}
const mouseup = () => {
  isMove.value = false
}
</script>

<template>
  <div class="parent">
    <div ref="dom1" @mouseup="mouseup" @mousedown="mousedown" @mousemove="mousemove" class="test"></div>
  </div>
</template>

<style lang="less">
.parent {
  position: relative;
  height: 100vh;
  width: 100vw;
}
.test {
  height: 100px;
  width: 100px;
  background-color: mediumspringgreen;
  position: absolute;
  top: 20px;
}
</style>
