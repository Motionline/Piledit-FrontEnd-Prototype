<template>
  <div id="Home">
    <svg height="1200" width="1200">
      <ElementBlockBase />
      <ElementBlockBase />
      <ElementBlockBase />
      <ElementBlockBase />
      <ElementBlockBase />
    </svg>
  </div>
</template>

<style scoped>
#canvas {
  border: 1px solid #000;
}
</style>

<script>
import ElementBlockBase from '../components/Atoms/ElementBlockBase'
export default {
  components: {
    ElementBlockBase
  }
}
</script>
