<template>
    <div>
        <Sidebar/>
        <div class="main-view">

            <div class="carousel">
                <el-carousel 
                indicator-position="outside"
                height="400px"
                id="carID"
                >
                    

                    <el-carousel-item v-for="item in CarouselImg" :key="item.id" >
                        <div class="run-box">
                            <el-image :src="item.imageId" class="run" />
                        </div>
                        <div class="carouse-text">
                            {{ item.title}}
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="view-text">
                <div class="infinite-list-wrapper" style="overflow: auto">
                    <div
                        v-infinite-scroll="load"
                        class="list"
                        :infinite-scroll-disabled="disabled"
                        > <!-- 伪无限滚动，注意要使用图片懒加载 -->
                        <div>

                            <div class="list-time" v-if="PinnedNews.length">
                                置顶
                            </div>

                            <template v-for="(item) in PinnedNews" :key="item.id">
                                <div class="list-item" @click="turnToDisplay(item.id)">
                                    <hr/>
                                    <div class="list-inf">
                                        <div class="list-img-box">
                                            <el-image :src="root+imgBed+item.coverImageId" loading="lazy" class="list-img"/>
                                        </div>
    
                                        <div class="list-text-box">
                                            <p class="title">{{ item.title }}</p>
                                            <div class="tag" >
                                                <p v-for="(itemTag,index) in item.tagNameList" :key="index" style="display:inline;">
                                                    {{ itemTag }} &emsp; 
                                                </p>
                                            </div>
                                            <div class="foot">
                                                <p class="writer">{{item?item.contributorName.replaceAll('$',' '):'Loading'}}</p>
                                                <p class="time">{{item.releaseTime}}</p>
                                            </div>
                                        </div>   
    
                                    </div>
                                </div>
                            </template>

                            
    
                            <div class="list-time" v-if="TodayNews.length" >
                                Today
                            </div>

                            <template v-for="(item) in TodayNews" :key="item.id">
                                <div class="list-item" @click="turnToDisplay(item.id)" >
                                    <hr/>
                                    <div class="list-inf">
                                        <div class="list-img-box">
                                            <el-image :src="root+imgBed+item.coverImageId" loading="lazy" class="list-img"/>
                                        </div>
                                        <div class="list-text-box">
                                            <p class="title">{{ item.title }}</p>
                                            <div class="tag" >
                                                <p v-for="(itemTag,index) in item.tagNameList" :key="index" style="display:inline;">
                                                    {{ itemTag }} &emsp; 
                                                </p>
                                            </div>
                                            
                                            <div class="foot">
                                                <p class="writer">{{ item?item.contributorName.replaceAll('$',' '):'Loading'}}</p>
                                                <p class="time">{{item.releaseTime}}</p>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                            </template>
                            

                            <!-- <div class="list-time" v-if="NonNews.length">
                                Non
                            </div> -->

                            <div v-for="(item,index) in NonNews" :key="index" class="non-time-box">
                                
                                <div class="non-date">{{ item?item.date.replaceAll('-','.'):''}}</div>
                                <hr/>
                                <template v-for="item2 in item.member" :key="item2.id">
                                    <div class="list-item" @click="turnToDisplay(item2.id)">
                                        <div class="list-inf">
                                            <div class="list-img-box">
                                                <el-image :src="root+imgBed+item2.coverImageId" loading="lazy" class="list-img"/>
                                            </div>
                                            <div class="list-text-box">
                                                <p class="title">{{ item2.title }}</p>
                                                <div class="tag" >
                                                    <p v-for="(itemTag,index) in item2.tagNameList" :key="index" style="display:inline;">
                                                        {{ itemTag }}&emsp;
                                                    </p>
                                                </div>
                                                <div class="foot">
                                                    <p class="writer">{{ item2?item2.contributorName.replaceAll('$',' '):'Loading'}}</p>
                                                    <p class="time">{{item2.releaseTime}}</p>
                                                </div>
                                            </div>   
                                        </div>
                                    </div>
                                </template>
                            </div>


                        </div>
                        
                        

                    </div>
                    <p v-if="loading">Loading...</p>
                    <p v-if="noMore" class="end-text">...No More...</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import Sidebar from '../components/MainSidebar.vue';
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef,onBeforeUpdate} from 'vue'
import {root,imgBed,getPinnedNew,getNonTopNews,getCarouselImg,getCarousel} from '../api/api'
import { now } from 'lodash';
import router from '@/router';
import { useStore } from 'vuex'



export default defineComponent({
    components: {
        Sidebar,

    },
    name:'Main',



    setup(){

        const imgArr = ['https://img1.imgtp.com/2023/01/28/TRuKTWXE.jpg',
                            'https://img1.imgtp.com/2023/01/28/Eo4qcrOW.jpg',
                            'https://img1.imgtp.com/2023/01/28/lN6g5eaI.png']
        const count = ref(10)
        const loading = ref(false)
        const noMore = computed(() => count.value >= 10)
        const disabled = computed(() => loading.value || noMore.value)
        const store = useStore(); 

        const Filter = computed(() => store.state.ArtFilter)
        const filter = ref(Filter.value)
        


        let $PINNEDNEWS:any;
        let $TODAYNEWS:any;
        let $NONNEWS:any;

        let PinnedNews = ref([] as Array<any>);
        let TodayNews = ref([] as Array<any>);
        let NonNews = ref([] as Array<any>);
        let NonTimeBox = ref([] as Array<any>);
                        
        const load = () => {
            loading.value = true;
            setTimeout(() => {
                count.value += 1
                loading.value = true
                }, 1000)
            }

        //获取和处理所有置顶新闻稿
        async function setPinnedNew(){
            await getPinnedNew()
            .then(res=>{
                let RequestData = JSON.parse(JSON.stringify(res))
                PinnedNews.value = RequestData;
            }).catch((res)=>{console.log(res)})
        }

        //获取和处理所有非置顶新闻稿
        async function setNonTopNews() {
            await getNonTopNews()
            .then(res=>{
                let RequestData = JSON.parse(JSON.stringify(res))
                NonNews.value = RequestData
            }).catch((res)=>{console.log(res)})
        }

        //路由跳转函数
        function turnToDisplay(num:number){
            router.push('/Display?='+num)
        }

        //筛选比较器

        watch(() => store.state.ArtFilter,(newVal, oldVal)=>{
            if(!$PINNEDNEWS)return

            PinnedNews.value = []
            for(let i=0;i<$PINNEDNEWS.length;i++){
                let item = $PINNEDNEWS[i];
                let id = Number(item.categoryId);
                if( id === Filter.value || Filter.value === 0 ){
                    PinnedNews.value.push(item);
                }
            }

            TodayNews.value = []
            for(let i=0;i<$TODAYNEWS.length;i++){
                let item = $TODAYNEWS[i];
                let id = Number(item.categoryId);
                if( id === Filter.value || Filter.value === 0 ){
                    TodayNews.value.push(item);
                }
            }

            //比较复杂的时间线重排
            //console.log($NONNEWS)
            NonNews.value = [];
            let NonTimeBox = [];
            for(let i=0;i<$NONNEWS.length;i++){
                let item = $NONNEWS[i];
                for(let j=0;j<item.member.length;j++){
                    let item2 = item.member[j];
                    let id = Number(item2.categoryId);
                    if( id === Filter.value || Filter.value === 0 ){
                        NonTimeBox.push(item2);
                    }
                }
            }

            let DateBox:Array<DateItem> = [];
                interface DateItem{
                    date:string,
                    member:any
                }

                let DateCacheMap = new Map();
                for(let i=0;i<NonTimeBox.length;i++){
                    let item = NonTimeBox[i]
                    if(DateCacheMap.has(item.releaseTime.slice(0,10))){
                        DateBox[DateCacheMap.get(item.releaseTime.slice(0,10))].member.push(item);
                    }
                    else{
                        let $PushItem:DateItem = {
                            date:item.releaseTime.slice(0,10),
                            member:[]
                        }
                        $PushItem.member.push(item)
                        DateBox.push($PushItem);
                        DateCacheMap.set(item.releaseTime.slice(0,10),DateCacheMap.size)
                    }
                }
                NonNews.value = DateBox;



        },{immediate:true,deep:true})


        const CarouselImg = ref([] as any)
        async function setCarousel() {
            let res = [] as any;
            await getCarousel().then(res =>{
                for(let i=0;i<res.length;i++){
                    res[i].imageId = getCarouselImg(res[i].imageId);
                    CarouselImg.value.push(res[i]);
                    console.log(CarouselImg.value)
                }
            })
        }

        
        onMounted(() => {

            setCarousel();


            (async () => {
                await setPinnedNew();
                await setNonTopNews();
            })().then(()=>{

                //格式化当前时间
                let nowTime =(new Date).getFullYear() + '-';
                nowTime += (()=>{
                    let m = ((new Date).getMonth()+1);
                    if(m<10){
                        return '0'+m;
                    }
                    else{
                        return m
                    }
                })()
                nowTime += '-' ;
                nowTime += (()=>{
                    let m = ((new Date).getDate());
                    if(m<10){
                        return '0'+m;
                    }
                    else{
                        return m
                    }
                })()

                //提取今日新闻
                    let data = NonNews.value
                    for(let j=0;j<data.length;j++){
                        let item = data[j];
                        let SendTime = item.releaseTime.slice(0,10)
                        if(SendTime === nowTime){
                            TodayNews.value.push(item);
                        }
                        else{
                            NonTimeBox.value.push(item);
                        }
                    }

                //对其他Non类新闻做时间线划分处理（这里按日期归类）
                let DateBox:Array<DateItem> = [];
                interface DateItem{
                    date:string,
                    member:any
                }

                let DateCacheMap = new Map();
                for(let i=0;i<NonTimeBox.value.length;i++){
                    let item = NonTimeBox.value[i]
                    if(DateCacheMap.has(item.releaseTime.slice(0,10))){
                        DateBox[DateCacheMap.get(item.releaseTime.slice(0,10))].member.push(item);
                    }
                    else{
                        let $PushItem:DateItem = {
                            date:item.releaseTime.slice(0,10),
                            member:[]
                        }
                        $PushItem.member.push(item)
                        DateBox.push($PushItem);
                        DateCacheMap.set(item.releaseTime.slice(0,10),DateCacheMap.size)
                    }
                }

                NonNews.value = [];
                NonNews.value = DateBox;

                //完成日期分类计算结果并储存,实际上中间量不应该是响应式，但是我现在懒得改

                $PINNEDNEWS = PinnedNews.value;
                $TODAYNEWS = TodayNews.value;
                $NONNEWS = NonNews.value;


            })
            
        });

        // onBeforeUpdate(()=>{
        //     FilterFunc()
        // })

        return{
            count,
            loading,
            disabled,
            noMore,
            imgArr,
            load,

            root,
            imgBed,

            NonNews,
            PinnedNews,
            TodayNews,

            turnToDisplay,
            Filter,
            CarouselImg
        }
    }
})
    
</script>

<style scoped lang="less">
@cwidth : 40%;
@border-r : 8px;
@main-view-width : 60vw;
.main-view{
    background-color:  #ffffff;
    position: absolute;
    z-index: -1;
    left: 18.5vw;
    width: @main-view-width;
    border-radius: @border-r;
    .carousel{
        width: 95%;
        margin: 0 auto;
        overflow: hidden;
        .carouse-text{
            position: absolute;
            z-index: 2;
            background-color: #FFA156;
            border-top-right-radius: @border-r;
            border-bottom-right-radius: @border-r;
            width: @cwidth;
            height: 100%;
            left:100%-@cwidth;
            }
        
        .run-box{
            border-radius: @border-r;
            overflow: hidden;
            .run{
                border-radius: @border-r;
                overflow: hidden;
            }
        }
        
    }
    .view-text{
        width: 100%;
        .infinite-list-wrapper{
            background-color:  #ffffff;
            margin: 2vh auto;
            width: 95%;

            .list-time{
                margin-bottom: 0;
                font-size: 40px;
            }

            .list-item{
                background-color:  #ffffff;
                position: relative;
                margin: 5vh auto;
                height: 25vh;
                width: 100%;
                
                .list-inf{
                    margin: 0 auto;
                    display: flex;
                    height: 100%;
                    .list-img-box{
                        position: relative;
                        overflow: hidden;
                        width: 30%;
                        background-color:  #ffffff;
                    }
                    
                }
            }
            .list-text-box{
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                width: 70%;
                height: 100%;
                .title{
                    font-family: 'Noto Serif SC';
                    font-style: normal;
                    font-weight: 550;
                    font-size: 36px;
                    line-height: 52px;

                    margin-top: 0;
                    margin-left: 1vw;
                }
                .tag{
                    
                    margin-left: 1vw;
                    
                    margin-bottom: 1vw;
                }
                .foot{
                    font-size: 20px;
                    margin-left: 1vw;
                    width: 96%;
                    display: flex;
                    justify-content: space-between;
                    /*position: absolute;*/
                    bottom: 0;
                    
                }
            }
            .end-text{
                text-align: center;
            }
            
        }
       
    }

    .non-date{
        font-size: 48px;
    }

}

</style>

<style lang="less">
@i-width:20%;
#carID{
    .el-carousel__indicators{
        position: absolute;
        background-color: #FFA156;
        width: @i-width;
        left:100%-@i-width;
        button{
            height: 6px;
            border-radius: 20%;
        }
    }
}
</style>