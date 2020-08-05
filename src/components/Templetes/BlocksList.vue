<template>
  <svg height="400" width="1200" id="blockComponentsSandBox">
    <foreignObject height="45" width="340">
      <v-btn
        :ripple="false"
        @click="addBlock('LoadingVideoBlock')"
        @dragend="dragEnd($event, 'LoadingVideoBlock')"
        draggable="true"
        elevation="0"
        class="dragBlock-btn"
        text
      >
        <DragLoadingVideoBlock />
      </v-btn>
    </foreignObject>
    <foreignObject height="45" width="340" y="50">
      <v-btn
        :ripple="false"
        @click="addBlock('DebugBlock')"
        @dragend="dragEnd($event, 'DebugBlock')"
        draggable="true"
        elevation="0"
        class="dragBlock-btn"
        text
      >
        <DragDebugBlock />
      </v-btn>
    </foreignObject>
    <foreignObject height="75" width="340" y="100">
      <v-btn
        :ripple="false"
        @click="addBlock('DefinitionComponentBlock')"
        @dragend="dragEnd($event, 'DefinitionComponentBlock')"
        draggable="true"
        elevation="0"
        class="dragBlock-btn"
        text
      >
        <DragDefinitionComponentBlock />
      </v-btn>
    </foreignObject>
  </svg>
</template>

<script>
import DragLoadingVideoBlock from '@/components/Organisms/DragLoadingVideoBlock'
import DragDebugBlock from '@/components/Organisms/DragDebugBlock'
import DragDefinitionComponentBlock from '@/components/Organisms/DragDefinitionComponentBlock'
export default {
  name: 'BlocksList',
  components: {
    DragLoadingVideoBlock,
    DragDebugBlock,
    DragDefinitionComponentBlock
  },
  methods: {
    addBlock (blockType) {
      this.$store.dispatch('Blocks/add', {
        position: {
          x: 0,
          y: 0
        },
        blockType
      })
    },
    dragEnd (event, blockType) {
      if (event.clientY <= 400) {
        this.$store.dispatch('Blocks/add', {
          position: {
            x: event.clientX - 250,
            y: event.clientY
          },
          blockType
        })
      }
    }
  }
}
</script>

<style scoped>
.dragBlock-btn::before {
  color: transparent;
}

.dragBlock-btn:hover {
  color: red;
}
</style>
