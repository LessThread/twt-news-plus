import { createStore } from 'vuex'

export default createStore({
  state: {
    ArtFilter:0
  },
  mutations: {
    changeArtFilter(state,index:number){
      state.ArtFilter = index;
      console.log(state.ArtFilter)
    }
  },
  actions: {
  },
  modules: {
  }
})
