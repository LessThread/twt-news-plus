<template>
    <div class="display">

        <div class="title">
            {{Title}}
        </div>

        <div class="content">

            <div class="side">
                <div class="data">
                    <div class="data-common">{{year}}</div>
                    <div class="data-large">{{day}}</div>
                    <div class="data-common">{{hours}}</div>
                </div>
                <div class="tags">

                </div>
                <div class="infomation">
                    <div class="information-text">图/ {{contributorName}}</div>
                    <p class="information-text"> 文/ {{picName}}</p>
                    <p class="information-text">来源/ {{origin}}</p>
                </div>
                <div class="QR">
                    <img :src="qr[0]" class="QR-img"/>
                    <div class="QR-text">
                        - 微信扫码 -<br />获取更多资讯
                    </div>
                </div>
            </div>

            <div class="line">
                <div class="sx"></div>
            </div>

            <div class="text">
                <div>
                    <div class="text-img-box">
                        <el-image :src="imgID" class="text-img"/>
                    </div>

                    <!-- <div v-html="News" class="text-main">
                    </div> -->
                    <v-md-editor v-model="News" height="auto" mode="preview"></v-md-editor>
                    <!-- <v-md-preview v-model="News" height="800px"></v-md-preview> -->
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import { defineComponent, ref ,onMounted ,watch,getCurrentInstance} from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import router from '@/router';
import {getNews,displayImg} from '../api/api'
import { indexOf } from 'lodash';


export default defineComponent({
    setup() {
        const News = ref('Loading')
        const Title = ref('')
        const imgID = ref('')
        const year = ref("");
        const day = ref("");
        const hours = ref("");
        const origin = ref("");
        const contributorName = ref('')
        const picName = ref('');
        const qr = ref([require('../assets/QR/qr.png')])


        async function displayNews(){
            let url = router.currentRoute.value.fullPath;
            const id = url.slice(url.indexOf('?')+2);
            
            //获取新闻并解析各参数
            await getNews(id)
                .then(res =>{
                    News.value = res.text
                    Title.value = res.title
                    imgID.value = displayImg(res.bannerImageId);
                    year.value = res.releaseTime.slice(0,4);
                    day.value = res.releaseTime.slice(5,7)+"."+res.releaseTime.slice(8,10);
                    hours.value = res.releaseTime.slice(10,16);
                    origin.value = res.origin;
                    contributorName.value = res.contributorName.slice(0,res.contributorName.indexOf('$'));
                    picName.value = res.contributorName.slice(res.contributorName.indexOf('$')+1);
                    console.log(res)
                })

            }
        
            watch(() => router.currentRoute.value.fullPath,(newPath, oldPath) => {
                displayNews()
            },{ immediate: true });

        onMounted(() => {
            displayNews()
        }); 

        return {
            News,
            Title,
            imgID,
            year,
            day,
            hours,
            origin,
            contributorName,
            picName,
            qr,
        };
    },
})

</script>

<style lang="less" scoped>
.display{
    position: relative;
    z-index: 0;
    margin-left: 5vw;

    .title{
        font-family: 'Noto Serif SC';
        font-style: normal;
        font-weight: 500;
        font-size: 64px;
        line-height: 92px;
        color: #000000;

        margin-left: 1vw;
    }
}

.content{
    margin-top: 3vh;
    display: flex;
    width: 99%;
    min-height: 80vh;
    padding-left: 1%;
    padding-right: 1%;
    .side{
        width: 14%;
        /*border-style: dashed;*/
    }
    .line{
        width: 3%;
        .sx{
            margin: 0 auto;
            width: 2px;
            height: 90vh;
            background: rgba(13, 13, 14, 0.842);
        }
    }
    .text{
        width: 78%;
        background-color: #f0f0f0;
        position: relative;
        z-index: -1;
        height: auto;
        .text-img-box{
            width: 100%;
            overflow: hidden;
            height: 50vh;
        }
        .text-img{
            width: 100%;
        }

        .text-main{
            
        }
        .text-view{
            
        }
    }

    

    .side{
        .data{
            width: 80%;
            
            text-align: center;
            .data-common{
                font-size: 30px;
                font-family: 'Product Sans';
                font-style: normal;
                font-weight:100;
                font-size: 36px;
                line-height: 44px;
                text-align: center;
            }
            .data-large{
                font-size: 48px;
                font-family: 'Product Sans';
                font-style: normal;
                font-weight: 400;
                line-height: 44px;
                text-align: center;
            }
        }
        
        
    }
}

.infomation {
    margin-top: 5vh;
    width: 80%;
    text-align: center;

    font-family: 'Noto Serif SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 23px;
    color: #2A2A2A;

    .information-text {
        font-family: 'Noto Serif SC';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 23px;
        color: #2A2A2A;
    }

    
    
}

.QR{
    .QR-img{
        width: 80%;
    }
    .QR-text{
        width: 80%;
        text-align: center;
        font-family: 'Noto Serif SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
    }   
}

</style>

<style>
</style>