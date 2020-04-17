<template>
  <div>
    <svg>
      <rect
        :x="property.x"
        :y="property.y"
        :z="property.z"
        :width="property.w"
        :height="property.h"
        :fill="property.color"
        @mousedown="move($event)"
        @click.right="openContextMenu($event)"
      ></rect>
    </svg>
  </div>
</template>

<script lang>
export default {
  name: 'MakeComponents.vue',
  data () {
    return {
      ratio: 1,
      dx: 0,
      dy: 0,
      property: {
        x: 10,
        y: 10,
        w: 100,
        h: 100,
        color: 'red'
      },
      isMove: false,
      beforeMouseX: null,
      beforeMouseY: null
    }
  },
  mounted () {
    console.log('MOUNT LISTENER ON')
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy () {
    console.log('MOUNT LISTENER OFF')
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('mousemove', this.mouseMove)
  },
  methods: {
    openContextMenu () {
      const remote = require('electron').remote
      const Menu = remote.Menu
      const MenuItem = remote.MenuItem

      const menu = new Menu()
      menu.append(new MenuItem({ label: 'MenuItem1', click: function () { console.log('item 1 clicked') } }))
      menu.append(new MenuItem({ type: 'separator' }))
      menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

      window.addEventListener('contextmenu', function (e) {
        e.preventDefault()
        menu.popup(remote.getCurrentWindow())
      }, false)
    },
    move (e) {
      this.isMove = true
      e.preventDefault()
    },
    mouseUp (e) {
      this.isMove = false
      this.beforeMouseX = null
      this.beforeMouseY = null
      e.preventDefault()
    },
    mouseMove (e) {
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
}
</script>
