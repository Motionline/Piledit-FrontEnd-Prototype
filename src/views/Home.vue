<template>
  <div id="Home">
    <ApplicationTab />
    <h2>タイムライン(svgで作る)</h2>
    <h3>全てのコンポーネント</h3>
    <div v-for="(value, key) in allComponents" :key="key">
      <p>{{ key }}: {{ value }}</p>
    </div>
    <svg id="timeline" width="2200" height="800" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp">
      <g :transform="`translate(${this.timelinePositionX}, 0)`">
        <rect
          x="1"
          y="1"
          :width="width"
          height="320"
          fill="none"
          stroke="black"
          stroke-width="1"
        />
        <text
          v-for="i in 10"
          :key="i"
          :x="10 + (i-1) * 200"
          y="16"
        >
          00:0{{ i-1 }}:00
        </text>
        <g transform="translate(0, 20)">
          <rect
            x="100"
            y="1"
            width="200"
            height="50"
            fill="gray"
            stroke="none"
          />
          <line
            x1="1"
            y1="1"
            x2="2001"
            y2="1"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="1"
            y1="51"
            x2="2001"
            y2="51"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="1"
            y1="101"
            x2="2001"
            y2="101"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="1"
            y1="151"
            x2="2001"
            y2="151"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="1"
            y1="201"
            x2="2001"
            y2="201"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="1"
            y1="251"
            x2="2001"
            y2="251"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="1"
            y1="301"
            x2="2001"
            y2="301"
            stroke="black"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
  text {
    pointer-events: none;
    user-select: none;
  }
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationTab from '@/components/Organisms/ApplicationTab'
export default {
  components: { ApplicationTab },
  computed: {
    ...mapGetters('Components', [
      'allComponents'
    ])
  },
  data () {
    return {
      width: 2000,
      beforeMouseX: 0,
      timelinePositionX: 0,
      isDragging: false
    }
  },
  // mounted () {
  //   window.addEventListener('scroll', this.onScroll)
  // },
  // destroyed () {
  //   window.removeEventListener('scroll', this.onScroll)
  // },
  methods: {
    mouseDown (event) {
      this.isDragging = true
      this.beforeMouseX = event.offsetX
      event.preventDefault()
    },
    mouseMove (event) {
      if (!this.isDragging) return
      const res = this.timelinePositionX + event.offsetX - this.beforeMouseX
      if (res <= 0 && res >= -this.width + 1500) {
        this.timelinePositionX = res
        console.log(res)
      }
      this.beforeMouseX = event.offsetX
      event.preventDefault()
    },
    mouseUp (event) {
      this.isDragging = false
      this.beforeMouseX = 0
      this.beforeMouseY = 0
      event.preventDefault()
    }
  }
}
</script>
