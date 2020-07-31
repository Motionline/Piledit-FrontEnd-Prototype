<template>
  <svg
    @mousedown="mouseDown($event)"
    preserveAspectRatio="xMidYMid meet"
    :x="position.x"
    :y="position.y"
    :id="blockUniqueKey"
  >
    <path
      :d="path"
      stroke-width="2"
      stroke="#ee7800"
      fill="#f39800"
      transform="translate(1,1) scale(0.75, 0.75)"
    />
    <slot></slot>
    <path
      v-if="shadow"
      stroke-width="2"
      fill="#d3d3d8"
      :d="path"
      transform="translate(1,37) scale(0.75, 0.75)"
    />
  </svg>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const svgz = require('svg-z-order')
export default {
  name: 'ElementBlockBase',
  data () {
    return {
      path: 'm 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H 370.99997329711914 a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z',
      isDragging: false,
      position: {
        x: 0,
        y: 0
      },
      ratio: 1,
      dx: 0,
      dy: 0,
      beforeMouseX: 0,
      beforeMouseY: 0,
      blockUniqueKey: '',
      shadow: false
    }
  },
  mounted () {
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMove)

    // ブロック固有値を初期化する
    this.setBlockUniqueKey()

    const payload = {
      position: this.position,
      blockUniqueKey: this.blockUniqueKey,
      showShadow: false,
      childIdentify: ''
    }
    this.addBlock(payload)

    // Vuexのstateを監視して位置・shadowを変更する
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'Blocks/updatePosition') {
        this.position = state.Blocks.allBlocks[this.blockUniqueKey].position
      } else if (mutation.type === 'Blocks/onShowShadow' || mutation.type === 'Blocks/offShowShadow') {
        this.shadow = state.Blocks.allBlocks[this.blockUniqueKey].showShadow
      }
    })
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('mousemove', this.mouseMove)
  },
  methods: {
    setBlockUniqueKey () {
      this.blockUniqueKey = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16)
    },
    calculateCoordinate (offsetX, offsetY) {
      const mouseX = offsetX * this.ratio + this.dx
      const mouseY = offsetY * this.ratio + this.dy
      let dx, dy
      [dx, dy] = [0, 0]
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
    },
    updateCoordinate () {
      const payload = {
        position: this.position,
        blockUniqueKey: this.blockUniqueKey
      }
      this.updatePosition(payload)
    },
    updateChildrenCoordinate (block) {
      // MEMO: ここは正常に動いている
      let blockInSearch = block
      while (blockInSearch.child !== '') {
        const payloadChild = {
          position: {
            x: blockInSearch.position.x,
            y: blockInSearch.position.y + 36
          },
          blockUniqueKey: blockInSearch.child
        }
        this.updatePosition(payloadChild)
        blockInSearch = this.allBlocks[blockInSearch.child]
      }
    },
    isNearbyBlocks (coordinates1, coordinates2) {
      const isNearbyX1 = (coordinates1.x - coordinates2.x) <= 80
      const isNearbyX2 = (coordinates1.x - coordinates2.x) >= -160
      const isNearbyY1 = (coordinates2.y - coordinates1.y) <= 85
      const isNearbyY2 = (coordinates2.y - coordinates1.y) >= 30
      return isNearbyX1 && isNearbyX2 && isNearbyY1 && isNearbyY2
    },
    mouseDown (event) {
      this.isDragging = true
      event.preventDefault()
    },
    mouseMove (event) {
      if (!this.isDragging) return
      const blockElement = document.getElementById(this.blockUniqueKey)
      svgz.element(blockElement).toTop()
      this.calculateCoordinate(event.offsetX, event.offsetY)
      this.updateCoordinate()
      this.updateChildrenCoordinate(this.allBlocks[this.blockUniqueKey])

      // ブロックが接近したときにshadowを出す処理
      // ブロックが接続できることをユーザーに知らせるために必要
      // TODO: 計算量が大きすぎる？削減できるかもしれない。
      for (const key of Object.keys(this.allBlocks)) {
        const blockInSearch = this.allBlocks[key]
        const coordinateInSearch = blockInSearch.position
        const coordinateOneself = this.position
        const payload = { blockUniqueKey: key }
        if (this.blockUniqueKey !== key && this.isNearbyBlocks(coordinateInSearch, coordinateOneself)) {
          this.onShowShadow(payload)
        } else {
          this.offShowShadow(payload)
        }
      }
      event.preventDefault()
    },
    mouseUp (event) {
      this.isDragging = false
      this.beforeMouseX = 0
      this.beforeMouseY = 0

      // ブロックが接近した状態で移動をやめたときにブロックに接続する処理
      for (const key of Object.keys(this.allBlocks)) {
        if (this.blockUniqueKey === key) continue
        const blockInSearch = this.allBlocks[key]
        const coordinateInSearch = blockInSearch.position
        const coordinateOneself = this.position
        const isNearby = this.isNearbyBlocks(coordinateInSearch, coordinateOneself)
        if (isNearby) {
          this.position.x = coordinateInSearch.x
          // TODO: 目視で48に設定してあるが、ブロックの高さに合わせて書くべき
          this.position.y = coordinateInSearch.y + 36
          const payload = {
            childIdentify: this.blockUniqueKey,
            blockUniqueKey: key
          }
          this.addChild(payload)
          this.offShowShadow(payload)
        } else if (blockInSearch.child === this.blockUniqueKey && this.blockUniqueKey !== key) {
          this.removeChild({ blockUniqueKey: key })
        }
      }
      event.preventDefault()
    },
    ...mapMutations('Blocks', [
      'addBlock',
      'updatePosition',
      'onShowShadow',
      'offShowShadow',
      'addChild',
      'removeChild'
    ])
  },
  computed: {
    ...mapGetters('Blocks', [
      'allBlocks',
      'showShadow'
    ])
  }
}
</script>
