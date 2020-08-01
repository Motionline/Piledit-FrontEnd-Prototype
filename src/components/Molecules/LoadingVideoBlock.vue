<template>
  <ElementBlockBase
    :blockUniqueKey="blockUniqueKey"
    strokeColor="#ee7800"
    fillColor="#f39800"
    width="370"
  >
    <text x="10" y="30" fill="white" font-size="14" class="notFocusSVGText">動画ファイル</text>
    <foreignObject
      width="100"
      height="30"
      x="100"
      y="5"
    >
      <v-btn
        small
        outlined
        color="white"
        class="openDirectoryButton"
        @click="openFileDialog()"
      >
        {{ getDisplayButtonText() }}
      </v-btn>
    </foreignObject>
    <text x="205" y="30" fill="white" font-size="14" class="notFocusSVGText">を読み込む</text>
  </ElementBlockBase>
</template>

<script>
import ElementBlockBase from '@/components/Atoms/ElementBlockBase'
const dialog = require('electron').remote.dialog
const path = require('path')
export default {
  name: 'LoadingVideoBlock',
  components: {
    ElementBlockBase
  },
  props: {
    blockUniqueKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selectFilePath: ''
    }
  },
  methods: {
    openFileDialog () {
      this.selectFilePath = dialog.showOpenDialogSync(null, {
        properties: ['openFile'],
        title: 'Select a text file',
        defaultPath: '.',
        filters: [
          { name: 'text file', extensions: ['mp4'] }
        ]
      })
    },
    getDisplayButtonText () {
      if (this.selectFilePath) {
        return path.basename(this.selectFilePath[0])
      } else {
        return '開く'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notFocusSVGText {
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>

<style lang="scss">
.openDirectoryButton .v-btn__content {
  position: unset !important;
}
</style>
