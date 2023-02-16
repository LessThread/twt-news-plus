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
                    <div class="carouse-text">
                        information
                    </div>

                    <el-carousel-item v-for="item in imgArr" :key="item" >
                        <div class="run-box">
                            <el-image :src="item" class="run" />
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

                            <div class="list-time">
                                置顶 + {{ Filter }}
                            </div>

                            <div v-for="(item) in PinnedNews" :key="item.id" class="list-item" @click="turnToDisplay(item.id)">
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
                                            <p class="writer">{{ item.contributorName }}</p>
                                            <p class="time">{{item.releaseTime}}</p>
                                        </div>
                                    </div>   

                                </div>
                            </div>
    
                            <div class="list-time" v-if="TodayNews.length" >
                                Today
                            </div>

                            <div v-for="(item) in TodayNews" :key="item.id" class="list-item" @click="turnToDisplay(item.id)">
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
                                            <p class="writer">{{ item.contributorName }}</p>
                                            <p class="time">{{item.releaseTime}}</p>
                                        </div>
                                    </div>   
                                </div>
                            </div>

                            <div class="list-time">
                                Non
                            </div>

                            <div v-for="(item,index) in NonNews" :key="index" class="non-time-box">
                                <hr/>
                                <div>{{ item.date }}</div>

                                <div v-for="item2 in item.member" :key="item2.id" class="list-item" @click="turnToDisplay(item2.id)">
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
                                                <p class="writer">{{ item2.contributorName }}</p>
                                                <p class="time">{{item2.releaseTime}}</p>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                                
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
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef} from 'vue'
import {root,imgBed,getPinnedNew,getNonTopNews} from '../api/api'
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
        console.log(Filter.value)
        console.log(store.state.ArtFilter)

        const load = () => {
            loading.value = true;
            setTimeout(() => {
                count.value += 1
                loading.value = true
                }, 1000)
            }
    
        const PinnedNews = ref([] as Array<any>);
        const TodayNews = ref([] as Array<any>);
        let NonNews = ref([] as Array<any>);
        let NonTimeBox = ref([] as Array<any>);

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

        
        onMounted(() => {
            (async () => {
                await setPinnedNew();
                await setNonTopNews();
            })().then(()=>{
                console.log(NonNews.value)

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

                console.log(DateBox)
                console.log(DateCacheMap)

                NonNews.value = [];
                NonNews.value = DateBox;

            })
            
        });

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
            Filter
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
                min-height: 25vh;
                width: 100%;
                
                .list-inf{
                    margin: 0 auto;
                    display: flex;
                    .list-img-box{
                        position: relative;
                        overflow: hidden;
                        width: 30%;
                        background-color:  #ffffff;
                    }
                    .list-text-box{
                        width: 70%;

                        .title{
                            margin-top: 0;
                            margin-left: 1vw;
                            font-size: 36px;
                        }
                        .tag{
                            
                            margin-left: 1vw;
                            
                            margin-bottom: 1vw;
                        }
                        .foot{
                            margin-left: 1vw;
                            width: 96%;
                            display: flex;
                            justify-content: space-between;
                            /*position: absolute;*/
                            bottom: 0;
                            
                        }
                    }
                }
            }
            .end-text{
                text-align: center;
            }
            
        }
       
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