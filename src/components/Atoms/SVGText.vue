<template>
  <text
    :x="x"
    :y="y"
    fill="white"
    font-size="14"
    class="notFocusSVGText"
  >
    <slot />
  </text>
</template>

<script>
export default {
  name: 'SVGText',
  props: {
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
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
