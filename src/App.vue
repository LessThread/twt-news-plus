<template>
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