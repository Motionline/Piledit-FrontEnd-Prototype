<template>
  <svg height="400" width="1200" id="blockComponentsSandBox">
    <component
      v-for="(value, key, index) in this.allBlocks"
      :is="value.blockType"
      :key="index"
      :blockUniqueKey="key"
      :x="value.position.x"
      :y="value.position.y"
      :showShadow="value.showShadow"
      @stopDragging="stopDragging($event)"
      @updatePosition="updatePosition($event)"
      @removeBlock="removeBlock($event)"
    />
  </svg>
</template>

<script>
import LoadingVideoBlock from '@/components/Organisms/LoadingVideoBlock'
import DebugBlock from '@/components/Organisms/DebugBlock'
import DefinitionComponentBlock from '@/components/Organisms/DefinitionComponentBlock'
export default {
  name: 'BlocksSandBox',
  components: {
    LoadingVideoBlock,
    DebugBlock,
    DefinitionComponentBlock
  },
  props: {
    allBlocks: {
      type: Object,
      required: true
    }
  },
  methods: {
    stopDragging (event) {
      this.$store.dispatch('Blocks/stopDragging', event)
    },
    updatePosition (event) {
      this.$store.dispatch('Blocks/update', event)
    },
    removeBlock (event) {
      this.$store.dispatch('Blocks/remove', event.blockUniqueKey)
    }
  }
}
</script>

<style scoped>
#blockComponentsSandBox {
  border: 4px black solid;
}
</style>
