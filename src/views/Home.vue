<template>
  <div id="Home">
    <ApplicationTab />
    <h2>タイムライン(svgで作る)</h2>
    <v-btn @click="outputMovieConfigurationFile">出力する</v-btn>
    <h3>全てのコンポーネント</h3>
    <div v-for="(_, key) in allComponents" :key="key">
      <v-btn @click="addComponentObject({ payload: { key } })">{{ key }}</v-btn>
    </div>
    <Timeline :componentObjects="componentObjects" />
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import Timeline from '@/components/Templetes/Timeline'
import ApplicationTab from '@/components/Organisms/ApplicationTab'
const fs = require('fs')
const app = require('electron').remote.app
export default {
  components: {
    Timeline,
    ApplicationTab
  },
  computed: {
    ...mapGetters('Components', [
      'allComponents'
    ]),
    ...mapGetters('Timeline', [
      'componentObjects'
    ])
  },
  methods: {
    addComponentObject ({ payload }) {
      this.$store.dispatch('Timeline/add', payload)
    },
    outputMovieConfigurationFile () {
      for (const key of Object.keys(this.componentObjects)) {
        const componentObject = this.componentObjects[key]
        const path = `${app.getAppPath()}/JSON`
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path)
        }
        fs.writeFileSync(
          `${path}/${key}.json`,
          JSON.stringify({
            Frame: {
              Begin: componentObject.position.x,
              End: componentObject.position.x + componentObject.width,
              Length: componentObject.width
            }
          }, undefined, 2), 'utf-8')
      }
    }
  }
}
</script>
