<template>
  <div id="Home">
    <BlocksSandBox :allBlocks="allBlocks" />
    <BlocksList />
  </div>
</template>

<style scoped>
</style>

<script>
import BlocksSandBox from '@/components/Templetes/BlocksSandBox'
import BlocksList from '@/components/Templetes/BlocksList'
import { mapGetters } from 'vuex'
export default {
  components: {
    BlocksSandBox,
    BlocksList
  },
  computed: {
    ...mapGetters('Blocks', [
      'allBlocks'
    ])
  }
}
</script>
