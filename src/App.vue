<template>
<div>
  
</div>
      <div class="header">
        <Header/>
      </div>

      <div class="MainView">
          <router-view/>
      </div>

      <div class="recommend">
        <Recommend/>
      </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Recommend from '@/components/Recommend.vue';
import Header from '@/components/Header.vue';
import MainView from '@/views/MainView.vue';
import { useStore } from 'vuex';
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef,onBeforeUpdate} from 'vue'
import {getAllNews} from '@/api/api';

export default defineComponent({
  components: {
    Recommend,
    Header,
  },

  setup(){
    onMounted(()=>{
      function isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      // localStorage.setItem('isiphone',flag)
      console.log(flag)
      return flag;
    }
    if (isMobile()) {
      console.log("移动端");
    } else {
      console.log("pc端");
    }

    })
  }
})
</script>

<style lang="less" scoped>

.recommend{
  position: fixed;
  background-color: #ffffff;
  z-index: 4;
  top: 10vh;
  right: 0vw;
  height: 90vh;
  width: 20vw;
}

.MainView{
  position: absolute;
  background-color:  #ffffff;

  top: 10vh;
  left: 0vw;
  width: 80vw;
  height: auto;
}

.header{
  position: fixed;
  background-color: #ffffff;
  top: 0vw;
  left: 0;
  width: 100vw;
  height: 10vh;
  z-index: 9;
}
</style>