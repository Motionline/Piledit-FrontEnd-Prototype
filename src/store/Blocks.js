import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const blocks = {
  namespaced: true,
  state: {
    allBlocks: {},
    removedBlockUniqueKey: ''
  },
  getters: {
    allBlocks: (state) => state.allBlocks,
    removedBlockUniqueKey: (state) => state.removedBlockUniqueKey
  },
  mutations: {
    addBlock (state, payload) {
      state.allBlocks[payload.blockUniqueKey] = {
        position: payload.position,
        showShadow: payload.showShadow,
        child: payload.childIdentify
      }
    },
    removeBlock (state, payload) {
      state.removedBlockUniqueKey = payload.blockUniqueKey
      delete state.allBlocks[payload.blockUniqueKey]
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

export const Blocks = blocks
