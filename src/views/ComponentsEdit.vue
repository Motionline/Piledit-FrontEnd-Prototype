<template>
  <div id="Home">
    <ApplicationTab />
    <BlocksSandBox :allBlocks="allBlocks" />
    <BlocksList />
    <v-btn @click="csl">check</v-btn>
  </div>
</template>

<style scoped>
</style>

<script>
import BlocksSandBox from '@/components/Templetes/BlocksSandBox'
import BlocksList from '@/components/Templetes/BlocksList'
import ApplicationTab from '@/components/Organisms/ApplicationTab'
import { mapGetters } from 'vuex'
export default {
  components: {
    BlocksSandBox,
    BlocksList,
    ApplicationTab
  },
  computed: {
    ...mapGetters('Blocks', [
      'allBlocks'
    ]),
    ...mapGetters('Components', [
      'allComponents'
    ])
  },
  methods: {
    csl () {
      console.log(this.allComponents)
    }
  }
}
</script>
