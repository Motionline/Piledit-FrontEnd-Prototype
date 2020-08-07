<template>
  <EventBlockBase
    :blockUniqueKey="blockUniqueKey"
    :x="x"
    :y="y"
    :showShadow="showShadow"
    :strokeColor="strokeColor"
    :fillColor="fillColor"
    :width="width"
    @stopDragging="stopDragging($event)"
    @updatePosition="updatePosition($event)"
    @removeBlock="removeBlock($event)"
  >
    <SVGText x="10" y="45" color="white">
      コンポーネント定義
    </SVGText>
  </EventBlockBase>
</template>

<script>
import SVGText from '@/components/Atoms/SVGText'
import EventBlockBase from '@/components/Molecules/EventBlockBase'
export default {
  name: 'DefinitionComponentBlock',
  components: {
    SVGText,
    EventBlockBase
  },
  props: {
    blockUniqueKey: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    showShadow: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      selectFilePath: '',
      strokeColor: '#e9bc00',
      fillColor: '#fcc800',
      width: '250'
    }
  },
  methods: {
    stopDragging (event) {
      this.$emit('stopDragging', event)
    },
    updatePosition (event) {
      this.$emit('updatePosition', event)
    },
    removeBlock (event) {
      this.$emit('removeBlock', event)
    }
  }
}
</script>

<style lang="scss">
  .openDirectoryButton .v-btn__content {
    position: unset !important;
  }
</style>
