import { createStore, createLogger } from 'vuex'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins: plugins,

  state() {
    return {
      postsList: ['sdf', 'sdfsd', 'qvxc']
    }
  },

  getters: {
    postsList(state) {
      return state.postsList
    }
  }
})