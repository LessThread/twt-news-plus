<template>
  <div class="recommend">
    <div class="head">
      <h1>推荐</h1>
      <hr style="border-color: black;"/>
    </div>
    <div class="message-box" v-for="index in 5" :key="index">
      <p>冯院叶底藏秋声 群英捧袂少年腾</p>
      
      <div class="foot">
        <div>
          近日新闻
        </div>
        <div>
          社团
        </div>
        <div>
          2022.102
        </div>
      </div>
      <hr style="border-color: black;"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Header extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.recommend{
  .head{
    position: relative;
    padding-left: 0.5vw;
    padding-right: 1vw;
  }
  .message-box{
    position: relative;
    top: -.1vh;
    padding-left: 1vw;
    padding-right: 1vw;
    font-weight: normal;
    .foot{
      display: flex;
      justify-content: space-between;
    }
  }

}
</style>
