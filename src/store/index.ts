import { createStore } from 'vuex'

export default createStore({
  state: {
    ArtFilter:0,
    TodayNewsHiddenNum:0,
    PinnedNewsHiddenNum:0,
    NonNewsHiddenNum:0,
  },
  mutations: {
    changeArtFilter(state,index:number){
      state.ArtFilter = index;
    },
    //切换筛选器清空
  },
  actions: {
  },
  modules: {
  }
})
