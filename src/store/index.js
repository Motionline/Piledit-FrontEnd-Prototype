import Vue from 'vue'
import Vuex from 'vuex'

import { Blocks } from './Blocks.js'
import { Components } from './Components.js'
import { Timeline } from './Timeline.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Blocks,
    Components,
    Timeline
  }
})
