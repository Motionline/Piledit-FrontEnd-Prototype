<template>
  <div id="Home">
    <svg height="400" width="1200" id="blockComponentsSandBox">
      <component
        v-for="(value, key, index) in this.allBlocksObject"
        :is="value"
        :key="index"
        :blockUniqueKey="key"
      />
    </svg>
    <v-btn @click="addBlockComponent('LoadingVideoBlock')" outlined>動画ブロック</v-btn>
  </div>
</template>

<style scoped>
</style>

<script>
import LoadingVideoBlock from '@/components/Molecules/LoadingVideoBlock'
import DarkEffectBlock from '@/components/Molecules/DarkEffectBlock'
import { mapMutations } from 'vuex'
export default {
  components: {
    LoadingVideoBlock,
    DarkEffectBlock
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'Blocks/removeBlock') {
        console.log(state.Blocks.removedBlockUniqueKey)
        this.$delete(this.allBlocksObject, state.Blocks.removedBlockUniqueKey)
      }
    })
  },
  data () {
    return {
      allBlocksObject: {}
    }
  },
  methods: {
    addBlockComponent (componentName) {
      const blockUniqueKey = this.getBlockUniqueKey()
      const payload = {
        position: { x: 0, y: 0 },
        blockUniqueKey,
        showShadow: false,
        childIdentify: ''
      }
      this.addBlock(payload)
      this.$set(this.allBlocksObject, blockUniqueKey, componentName)
      console.log(this.allBlocksObject)
    },
    getBlockUniqueKey () {
      return new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16)
    },
    ...mapMutations('Blocks', [
      'addBlock'
    ])
  }
}
</script>
