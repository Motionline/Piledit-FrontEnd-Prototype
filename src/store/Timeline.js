import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const timelineObjects = {
  namespaced: true,
  state: {
    componentObjects: {}
  }
}

export const Timeline = timelineObjects
