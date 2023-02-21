<template>
  <div class="recommend">

    <div class="head">
      <h1>推荐</h1>
      <hr style="border-color: black;"/>
    </div>

    <div class="message-box" v-for="item in RecommendNews" :key="item.index" @click="turn2Display(item.id)">
      <p>{{item.title}}</p>
      
      <div class="foot">
        <div>
          {{ getCategoryNameById(item.categoryId) }}
        </div>
        <!-- <div>
          社团
        </div> -->
        <div>
          {{ item.releaseTime.slice(0,10) }}
        </div>
      </div>
      <hr style="border-color: black;"/>
    </div>
    
  </div>
</template>

<script lang="ts">
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef} from 'vue'
import router from '@/router';
import { useRouter } from 'vue-router';
import {getAllNews,getCategoryNameById} from '@/api/api';

export default defineComponent({

  setup(){
    const RecommendNews = ref([] as any);
    let news = [] as any;

    async function SetRecommendNews(){
      await getAllNews()
      .then(res => {
        news = res;
        news.sort(function(a:any,b:any){
          return b.viewsNumber - a.viewsNumber;
        })
      })

      for(let i=0;i<5 && i<news.length; i++){
        RecommendNews.value.push(news[i]);
      }

      console.log(RecommendNews.value)

    }

    function turn2Display(id:number){
      router.push('/Display?='+id)
    }

    onMounted(()=>{
      SetRecommendNews();
    })

    return{
      RecommendNews,
      getCategoryNameById,
      turn2Display,
    }


  }
})
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
