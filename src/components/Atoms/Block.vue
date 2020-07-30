<template>
  <svg
    version="1.0"
    class="blockComponent"
    xmlns="http://www.w3.org/2000/svg"
    width="2400px"
    height="380px"
    viewBox="0 0 12000 1600"
    preserveAspectRatio="xMidYMid meet"
    @mousedown="move($event)"
    :x="position.x"
    :y="position.y"
    :z="position.z"
  >
    <image
      width="1000"
      height="150"
      x="0" y="0"
      :xlink:href="imgHref"
    />
  </svg>
</template>

<script>
export default {
  name: 'Block',
  props: {
    imgHref: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      ratio: 1,
      dx: 0,
      dy: 0,
      isMove: false,
      beforeMouseX: 0,
      beforeMouseY: 0
    }
  },
  mounted () {
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('mousemove', this.mouseMove)
  },
  methods: {
    move (event) {
      this.isMove = true
      event.preventDefault()
    },
    mouseUp (event) {
      this.isMove = false
      this.beforeMouseX = 0
      this.beforeMouseY = 0
      event.preventDefault()
    },
    mouseMove (event) {
      if (!this.isMove) return
      const mouseX = event.offsetX * this.ratio + this.dx
      const mouseY = event.offsetY * this.ratio + this.dy
      let dx = 0
      let dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
        dx = mouseX - this.beforeMouseX
        dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      const tempX = dx + Number(this.position.x)
      const tempY = dy + Number(this.position.y)
      if (tempX > 0) this.position.x = tempX
      if (tempY > 0) this.position.y = tempY
      event.preventDefault()
    }
  }
}
</script>

<style scoped></style>
