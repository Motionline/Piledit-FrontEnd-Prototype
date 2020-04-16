<template>
  <div id="app">
    <p>ここに動画をドロップ</p>
    <button @click="outputJson">JSONを吐き出す</button>
    <div class="fileDrop">
      <input
        type="file"
        id="inputFile"
        value=""
        @change="onFileChange"
        accept="video/mp4"
      />
    </div>
    <MakeComponents />
  </div>
</template>

<script lang="ts">
  import MakeComponents from "./components/MakeComponents.vue";
export default {
  name: 'App',
  components: {
    MakeComponents
  },
  data () {
    return {
      targetFilePath: ''
    }
  },
  methods: {
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files
      const filePath = files[0].path
      this.targetFilePath = filePath
    },
    outputJson() {
      const Dialog = require('electron').remote.dialog;
      if (this.targetFilePath === '') {
        Dialog.showErrorBox('出力できませんでした', 'ファイルが設定されていません')
      } else {
        const outputData = {
          info: {
            'target_movie': this.targetFilePath,
            'task_count': 0
          }
        }
        const outputDataJson = JSON.stringify(outputData, null, 2)
        const fs = require('fs')
        fs.writeFile(`/Users/momiyama/Desktop/JSON/example1.json`, outputDataJson, (error) => {
          if (error !== null) {
            console.log(error)
          }
        })
      }
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .fileDrop {
    height: 500px;
    border: red 2px dotted;
  }
  #inputFile {
    width: 100%;
    height: 100%;
  }
</style>
