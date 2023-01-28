<template>
      <div class="header">
        <Header/>
      </div>

      <div class="MainView">
        <MainView/>
      </div>

      <div class="recommend">
        <Recommend msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Recommend from '@/components/Recommend.vue';
import Header from '@/components/Header.vue';
import MainView from '@/views/MainView.vue';

@Options({
  components: {
    Recommend,
    Header,
    MainView
  },
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
@backgroundcolor : #fafafa;

.recommend{
  position: fixed;
  background-color: @backgroundcolor;

  top: 10vh;
  right: 0vw;
  height: 90vh;
  width: 20vw;
}

.MainView{
  position: absolute;
  background-color: rgba(255, 0, 0, 0.494);

  top: 10vh;
  left: 0vw;
  width: 80vw;
  height: auto;
}

.header{
  position: fixed;
  background-color: @backgroundcolor;
  top: 0vw;
  left: 0;
  width: 100vw;
  height: 10vh;
}
</style>

<!-- <style lang="less">
@i-width:20%;
.el-carousel__indicators--outside{
    position: absolute;
    background-color: #FFA156;
    width: @i-width;
    left:100%-@i-width;
    button{
        height: 6px;
        border-radius: 20%;
    }
}
</style> -->