<template>
  <v-app>
    <v-container fluid>
      <v-tabs transition="fade-transition">
        <v-tab>メイン</v-tab>
        <v-tab>コンポーネント作成</v-tab>
        <v-tab>ストア</v-tab>
        <v-btn outlined><v-icon>fa fa-plus</v-icon></v-btn>
        <v-tab-item>
          <v-col>
            <v-row>
              <v-text-field placeholder="検索" outlined rounded></v-text-field>
            </v-row>
            <v-row>
              <v-col>
                <div>
                  <img width="500px" src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1553227874/production/city/hero_image_27_1553227874.jpg"/>
                </div>
                <v-row>
                  <v-col>
                    <v-btn text>
                      <v-icon>fas fa-play</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn text>
                      <v-icon>fas fa-pause</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn text>
                      <v-icon>fas fa-stop</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <p>01:01:25.0</p>
                  </v-col>
                  <v-col>
                    <p>x1.0</p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <p>エクスポート</p>
                  <div>
                    <p>コンポーネントをドラッグ&ドロップするとエクスポートできます</p>
                  </div>
                </v-row>
                <v-row>
                  <p>書き出す</p>
                  <v-label>動画パス</v-label>
                  <v-text-field v-model="information.targetMovie"></v-text-field>
                  <v-label>種類</v-label>
                  <v-text-field v-model="information.extension"></v-text-field>
                  <v-label>品質</v-label>
                  <v-text-field></v-text-field>
                  <v-label>サイズ</v-label>
                  <v-text-field></v-text-field>
                  <v-btn
                          outlined
                          rounded
                          small
                  >より詳細な設定</v-btn>
                  <v-btn
                          @click="outputJson"
                          rounded
                          color="success"
                  >
                    書き出す！
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
            <v-row>タイムライン</v-row>
            <v-row>
              <v-col>編集</v-col>
              <v-col>コンポーネント</v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          a
        </v-tab-item>
        <v-tab-item>
          <h1>NewMovieEditor MarketPlace</h1>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const remote = require('electron').remote
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
@Component
export default class App extends Vue {
  public targetFilePath = ''
  public information = {
    targetMovie: '',
    taskCount: '0',
    extension: ''
  }

  public outputJson () {
    const Dialog = remote.dialog
    if (!this.isObjectEmpty(this.information)) {
      Dialog.showErrorBox('出力できませんでした', 'ファイルが設定されていません')
    } else {
      const outputData = {
        info: {
          ...this.information
        }
      }
      const outputDataJson = JSON.stringify(outputData, null, 2)
      fs.writeFile('/Users/momiyama/Desktop/JSON/example1.json', outputDataJson, (error: any) => {
        if (error !== null) {
          console.log(error)
        }
      })
    }
  }

  private isObjectEmpty (checkObject: Record<string, any>): boolean {
    let res = true
    for (const key in checkObject) {
      if (!checkObject[key]) {
        res = false
      }
    }
    return res
  }
}
</script>
