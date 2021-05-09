import { createStore, createLogger } from 'vuex'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins: plugins,

  state() {
    return {
      postsListToSearch: []
    }
  },

  mutations: {
    searchItem(state, payload) {
      console.log(payload.value)
      console.log(state.postsListToSearch)
    }
  },

  getters: {
    postsListToSearch(state) {
      return state.postsListToSearch
    }
  }
})