<template
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
                        > <!-- 无限滚动，注意要使用图片懒加载 -->
                        <div>
                            <div v-for="(item) in PinnedNews" :key="item.id" class="list-item">
                                <div class="list-time">
                                    置顶
                                </div>
                                <hr/>
                                <div class="list-inf">
                                    <div class="list-img-box">
                                        <el-image :src="root+imgBed+item.coverImageId" loading="lazy" class="list-img"/>
                                    </div>
                                    <div class="list-text-box">
                                        <p class="title">{{ item.title }}</p>
                                        <p class="tag" >tag</p>
                                        <div v-for="(itemTag,index) in item.tagNameList" :key="index">{{ itemTag }}+{{ index }}</div>
                                        <div class="foot">
                                            <p class="writer">{{ item.contributorName }}</p>
                                            <p class="time">{{item.releaseTime}}</p>
                                        </div>
                                    </div>   
                                </div>
                            </div>
    
                            <div v-for="(item) in TodayNews" :key="item.id" class="list-item">
                                <div class="list-time">
                                    Today
                                </div>
                                <hr/>
                                <div class="list-inf">
                                    <div class="list-img-box">
                                        <el-image :src="root+imgBed+item.coverImageId" loading="lazy" class="list-img"/>
                                    </div>
                                    <div class="list-text-box">
                                        <p class="title">{{ item.title }}</p>
                                        <p class="tag" >tag</p>
                                        <div v-for="(itemTag,index) in item.tagNameList" :key="index">{{ itemTag }}+{{ index }}</div>
                                        <div class="foot">
                                            <p class="writer">{{ item.contributorName }}</p>
                                            <p class="time">{{item.releaseTime}}</p>
                                        </div>
                                    </div>   
                                </div>
                            </div>

                            <div v-for="(item) in NonNews" :key="item.id" class="list-item">
                                <div class="list-time">
                                    Non
                                </div>
                                <hr/>
                                <div class="list-inf">
                                    <div class="list-img-box">
                                        <el-image :src="root+imgBed+item.coverImageId" loading="lazy" class="list-img"/>
                                    </div>
                                    <div class="list-text-box">
                                        <p class="title">{{ item.title }}</p>
                                        <p class="tag" >tag</p>
                                        <div v-for="(itemTag,index) in item.tagNameList" :key="index">{{ itemTag }}+{{ index }}</div>
                                        <div class="foot">
                                            <p class="writer">{{ item.contributorName }}</p>
                                            <p class="time">{{item.releaseTime}}</p>
                                        </div>
                                    </div>   
                                </div>
                            </div>


                        </div>
                        
                        

                    </div>
                    <p v-if="loading">Loading...</p>
                    <p v-if="noMore" class="end-text">...再也没有更多了...</p>
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

        const load = () => {
            loading.value = true;
            setTimeout(() => {
                count.value += 1
                loading.value = true
                }, 1000)
            }
    
        const PinnedNews = ref([] as Array<any>);
        const TodayNews = ref([] as Array<any>);
        const NonNews = ref([] as Array<any>);

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
                for(let i=0;i<NonNews.value.length;i++){
                    let data = NonNews.value[i].data
                    for(let j=0;j<data.length;j++){

                        let item = data[j];
                        let SendTime = item.releaseTime.slice(0,10)
                        if(SendTime === nowTime){
                            TodayNews.value.push(item)
                            NonNews.value.splice(item)
                        }
                        else{
                            console.log('normal')
                        }
                    }
                }

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
        }
    }
})
    
</script>

<style scoped lang="less">
@cwidth : 40%;
@border-r : 8px;
@main-view-width : 60vw;
.main-view{
    background-color: rgba(133, 136, 134, 0.469);
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
            background-color: #FFA156;
            margin: 2vh auto;
            width: 95%;

            .list-item{
                background-color: rgba(245, 249, 248, 0.323);
                position: relative;
                margin: 5vh auto;
                min-height: 25vh;
                width: 100%;
                .list-time{
                    margin-bottom: 0;
                    font-size: 40px;
                }
                .list-inf{
                    margin: 0 auto;
                    display: flex;
                    .list-img-box{
                        position: relative;
                        overflow: hidden;
                        width: 30%;
                        background-color: red;
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
                        }
                        .foot{
                            margin-left: 1vw;
                            width: 67%;
                            display: flex;
                            justify-content: space-between;
                            position: absolute;
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