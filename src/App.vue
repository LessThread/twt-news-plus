<template>
<div v-if="!Mobile" id="pc-top-div">
    <div class="header">
      <Header/>
    </div>
  
     <div class="MainView">
        <router-view/>
    </div>
  
    <div class="recommends">
        <div style="width:85%;background-color: #4db12500;">.</div>
        <div style="width:15%;max-width: 300px;background-color: rgba(252, 252, 251, 0);overflow: hidden;">
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
@wi:1820px;

#pc-top-div{
  max-width: @wi;
  background-color: #ffffff;
  min-height: 1000px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  min-width: 1200px;

}


.recommends{
  position: fixed;
  display:flex;
  background-color: #ffffff;
  z-index: 0;
  top: 100px;
  width: 100%;
  max-width: @wi;
  min-height: 1000px;
}

.MainView{
  position: absolute;
  background-color:  #ffffff;
  max-width: 1820px;
  width: 80%;
  top: 90px;
  z-index: 1;
  min-width: 1200px;
}

.header{
  position: fixed;
  background-color: #ffffff;
  max-width: 1820px;
  width: 100%;
  height: 100px;
  z-index: 2;
  top:0;

}
</style>

<style lang="less">

</style>