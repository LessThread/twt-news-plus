<template>
<div v-if="!Mobile" id="pc-top-div">
  <div  class="pc-view">

    <div class="header">
      <Header/>
    </div>
  
     <div class="MainView">
        <router-view/>
    </div>
  
    <!-- <div class="recommend">
      <Recommend/>
    </div> -->
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
    //Recommend,
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


#pc-top-div{
  max-width: 1620px;
  background-color: #ffffff;
  min-height: 1000px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  min-width: 1200px;
}


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
  max-width: 1620px;
  width: 100%;
  top: 90px;
  z-index: 1;
  min-width: 1200px;
}

.header{
  position: fixed;
  background-color: #ffffff;
  max-width: 1620px;
  width: 100%;
  height: 100px;
  z-index: 2;
  top:0;
}
</style>

<style lang="less">

</style>