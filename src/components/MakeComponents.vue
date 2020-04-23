<template>
  <div id="makeComponents">
    <svg>
      <rect
        :x="property.x"
        :y="property.y"
        :z="property.z"
        :width="property.w"
        :height="property.h"
        :fill="property.color"
        @mousedown="move($event)"
      >
      </rect>
      <rect
              :x="property2.x"
              :y="property2.y"
              :z="property2.z"
              :width="property2.w"
              :height="property2.h"
      >
      </rect>
    </svg>
    <div>
      <v-text-field
        v-model="property.w"
      >width</v-text-field>
    </div>
  </div>
</template>

<style lang="scss">
#makeComponents {
  border: red 5px solid;
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public ratio = 1
  public dx = 0
  public dy = 0
  public property = {
    x: 10,
    y: 10,
    z: 10,
    w: 100,
    h: 100,
    color: 'red'
  }

  property2 = {
    x: 200,
    y: 100,
    z: 0,
    w: 100,
    h: 100,
    color: 'green'
  }

  public isMove = false
  public beforeMouseX = 0
  public beforeMouseY = 0

  mounted (): void {
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMove)
  }

  beforeDestroy () {
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('mousemove', this.mouseMove)
  }

  public move (e: any) {
    this.isMove = true
    e.preventDefault()
  }

  public mouseUp (e: any) {
    this.isMove = false
    this.beforeMouseX = 0
    this.beforeMouseY = 0
    e.preventDefault()
  }

  public mouseMove (e: any) {
    if (!this.isMove) return
    const mouseX = e.offsetX * this.ratio + this.dx
    const mouseY = e.offsetY * this.ratio + this.dy
    let dx = 0
    let dy = 0
    if (this.beforeMouseX && this.beforeMouseY) {
      dx = mouseX - this.beforeMouseX
      dy = mouseY - this.beforeMouseY
    }
    this.beforeMouseX = mouseX
    this.beforeMouseY = mouseY
    const tempX = dx + Number(this.property.x)
    const tempY = dy + Number(this.property.y)
    if (tempX > 0) this.property.x = tempX
    if (tempY > 0) this.property.y = tempY
    e.preventDefault()
  }
}
</script>
