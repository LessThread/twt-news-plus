<template>
<div v-if="!Mobile" >
  <div  class="pc-view">

    <div class="header">
      <Header/>
    </div>
  
    <div class="MainView">
        <router-view/>
    </div>
  
    <div class="recommend">
      <Recommend/>
    </div>
  </div>
  
</div>


<div v-if="Mobile">
  <Mheader/>
  <div class="MMainView">
    <router-view/>
  </div>
</div>


</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Recommend from '@/components/Recommend.vue';
import Header from '@/components/Header.vue';
import { useStore } from 'vuex';
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef,onBeforeUpdate} from 'vue'
import {getAllNews} from '@/api/api';


import Mheader from '@/mobile-src/components/mobile-header.vue'

export default defineComponent({
  components: {
    Recommend,
    Header,
    Mheader
  },

  setup(){
    const store = useStore()

    const Mobile = ref(0);
    onMounted(()=>{
      function isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      // localStorage.setItem('isiphone',flag)
      console.log(flag)
      return flag;
    }
    if (isMobile()) {
      console.log("MOBILE");
      Mobile.value = 1;
    } else {
      console.log("PC");
      Mobile.value = 0;
    }

    })

    return{
      Mobile
    }
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

<style lang="less">

</style>