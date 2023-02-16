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
      console.log('change: '+state.ArtFilter)
    },
    //切换筛选器清空
    changeNewsHiddenNum(state,id:number){
      switch(id){
        case 1:state.TodayNewsHiddenNum+=1;break;
        case 2:state.PinnedNewsHiddenNum+=1;break;
        case 3:state.NonNewsHiddenNum+=1;break;
      }
      console.log('HiddenNum+1')
      
    },
    clearHiddenNum(state){
      console.log('clear')
      state.TodayNewsHiddenNum=0;
      state.PinnedNewsHiddenNum=0;
      state.NonNewsHiddenNum=0;
    }
  },
  actions: {
  },
  modules: {
  }
})
