import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const blocksCounter = {
  namespaced: true,
  state: {
    allBlocks: {}
  },
  getters: {
    allBlocks: (state) => state.allBlocks,
    showShadow: (state) => state.allBlocks.showShadow
  },
  mutations: {
    addBlock (state, payload) {
      state.allBlocks[payload.blockUniqueKey] = {
        position: payload.position,
        showShadow: payload.showShadow,
        child: payload.childIdentify
      }
    },
    updatePosition (state, payload) {
      state.allBlocks[payload.blockUniqueKey].position = payload.position
    },
    addChild (state, payload) {
      state.allBlocks[payload.blockUniqueKey].child = payload.childIdentify
    },
    removeChild (state, payload) {
      state.allBlocks[payload.blockUniqueKey].child = ''
    },
    onShowShadow (state, payload) {
      state.allBlocks[payload.blockUniqueKey].showShadow = true
    },
    offShowShadow (state, payload) {
      state.allBlocks[payload.blockUniqueKey].showShadow = false
    }
  }
}

export const Blocks = blocksCounter
