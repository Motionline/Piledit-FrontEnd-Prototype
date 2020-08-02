import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const blocks = {
  namespaced: true,
  state: {
    allBlocks: {}
  },
  getters: {
    allBlocks: (state) => state.allBlocks
  },
  mutations: {
    addBlock (state, { payload }) {
      Vue.set(state.allBlocks, payload.blockUniqueKey, payload.block)
    },
    removeBlock (state, { payload }) {
      Vue.delete(state.allBlocks, payload)
    },
    updateBlock (state, { payload }) {
      state.allBlocks[payload.blockUniqueKey].position = payload.position
    },
    updateChildBlock (state, { payload }) {
      let blockInSearch = state.allBlocks[payload.blockUniqueKey]
      while (blockInSearch.childBlockUniqueKey !== '') {
        state.allBlocks[blockInSearch.childBlockUniqueKey].position = {
          x: blockInSearch.position.x,
          y: blockInSearch.position.y + 37
        }
        blockInSearch = state.allBlocks[blockInSearch.childBlockUniqueKey]
      }
    },
    addChild (state, { payload }) {
      state.allBlocks[payload.blockUniqueKey].childBlockUniqueKey = payload.childBlockUniqueKey
    },
    removeChild (state, { payload }) {
      state.allBlocks[payload.blockUniqueKey].childBlockUniqueKey = ''
    },
    showShadow (state, { payload }) {
      state.allBlocks[payload.blockUniqueKey].showShadow = true
    },
    hideShadow (state, { payload }) {
      state.allBlocks[payload.blockUniqueKey].showShadow = false
    }
  },
  actions: {
    add ({ commit }, block) {
      const blockUniqueKey = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16)
      const payload = {
        blockUniqueKey,
        block: {
          position: block.position,
          blockType: block.blockType,
          showShadow: false,
          childBlockUniqueKey: ''
        }
      }
      commit('addBlock', { payload })
    },
    remove ({ commit }, blockUniqueKey) {
      commit('removeBlock', { payload: blockUniqueKey })
    },
    update ({ commit, state }, blockArg) {
      commit('updateBlock', { payload: blockArg })
      commit('updateChildBlock', { payload: blockArg })
      const blockUniqueKey = blockArg.blockUniqueKey
      const block = state.allBlocks[blockUniqueKey]
      const position = block.position
      for (const key of Object.keys(state.allBlocks)) {
        if (blockUniqueKey === key) continue
        const blockInSearch = state.allBlocks[key]
        const positionInSearch = blockInSearch.position
        // isNearbyBlocks関数
        const isNearbyX1 = (positionInSearch.x - position.x) <= 80
        const isNearbyX2 = (positionInSearch.x - position.x) >= -160
        const isNearbyY1 = (position.y - positionInSearch.y) <= 65
        const isNearbyY2 = (position.y - positionInSearch.y) >= 30
        const isNearby = isNearbyX1 && isNearbyX2 && isNearbyY1 && isNearbyY2
        // 終わり
        if (isNearby && blockInSearch.childBlockUniqueKey === '') {
          commit('showShadow', { payload: { blockUniqueKey: key } })
        } else {
          commit('hideShadow', { payload: { blockUniqueKey: key } })
        }
      }
    },
    stopDragging ({ commit, state }, blockArg) {
      const block = state.allBlocks[blockArg.blockUniqueKey]
      const position = block.position
      for (const key of Object.keys(state.allBlocks)) {
        if (blockArg.blockUniqueKey === key) continue
        const blockInSearch = state.allBlocks[key]
        const positionInSearch = blockInSearch.position
        // isNearbyBlocks関数
        const isNearbyX1 = (positionInSearch.x - position.x) <= 80
        const isNearbyX2 = (positionInSearch.x - position.x) >= -160
        const isNearbyY1 = (position.y - positionInSearch.y) <= 65
        const isNearbyY2 = (position.y - positionInSearch.y) >= 30
        const isNearby = isNearbyX1 && isNearbyX2 && isNearbyY1 && isNearbyY2
        // 終わり
        if (isNearby) {
          position.x = positionInSearch.x
          // TODO: 目視で48に設定してあるが、ブロックの高さに合わせて書くべき
          position.y = positionInSearch.y + 37
          commit('updateBlock', {
            payload: {
              blockUniqueKey: blockArg.blockUniqueKey,
              position
            }
          })
          commit('updateChildBlock', { payload: blockArg })
          const payload = {
            blockUniqueKey: key,
            childBlockUniqueKey: blockArg.blockUniqueKey
          }
          commit('addChild', { payload })
          commit('hideShadow', {
            payload: { blockUniqueKey: key }
          })
        } else if (blockInSearch.childBlockUniqueKey === blockArg.blockUniqueKey && blockArg.blockUniqueKey !== key) {
          commit('removeChild', {
            payload: { blockUniqueKey: key }
          })
        }
      }
    }
  }
}

export const Blocks = blocks
