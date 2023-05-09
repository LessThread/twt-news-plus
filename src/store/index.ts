import { createStore } from 'vuex'

export default createStore({
  state: {
    ArtFilter:0,
    recommendArr:[] as any,
    isPhone:0
  },
  mutations: {
    //切换筛选器清空
    changeArtFilter(state,index:number){
      state.ArtFilter = index;
    },

    //写入Recommend
    setRecommend(state,Arr:[]){
      state.recommendArr = Arr;
    },

    getPhone(state){
      state.isPhone = 1;
    }
  },
  actions: {
  },
  modules: {
  }
})
