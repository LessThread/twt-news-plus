import { createStore } from 'vuex'

export default createStore({
  state: {
    ArtFilter:0,
    recommendArr:[] as any,
  },
  mutations: {
    //切换筛选器清空
    changeArtFilter(state,index:number){
      state.ArtFilter = index;
    },

    //写入Recommend
    setRecommend(state,Arr:[]){
      state.recommendArr = Arr;
    }
  },
  actions: {
  },
  modules: {
  }
})
