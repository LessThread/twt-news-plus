<template>
    <div class="display">

        <div class="title">
            {{Title}}
        </div>
        <div class="text-head-inf">
            <p class="information">文/ {{contributorName}}</p>
            <p class="information"> 图/ {{picName}}</p>
        </div>
        <div class="content">

            <div class="text">
                <div>
                    <div class="text-img-box">
                        <el-image :src="imgID" class="text-img"/>
                    </div>

                    <div class="text-sorce">
                        来源：{{ origin }}
                    </div>

                    <!-- <div v-html="News" class="text-main">
                    </div> -->
                    
                    <div v-if="mdORhtml">
                        <v-md-editor v-model="News" height="auto" mode="preview"></v-md-editor>
                    </div>
                    <div v-if="!mdORhtml">
                        <p v-html = "News"></p>
                    </div>
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
import {getNews,displayImg} from '../../api/api'
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
        const qr = ref([require('../../assets/QR/qr.png')])
        const mdORhtml = ref();

        function setMdORhtml(){
            let mark = News.value.charAt(News.value.length - 1);
            if(mark === '@'){mdORhtml.value = 0;News.value = News.value.slice(0,-1)}
            else mdORhtml.value = 1;

        }


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

            watch(()=>News.value,(newPath, oldPath) => {
                setMdORhtml();
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
            mdORhtml,
        };
    },
})

</script>

<style lang="less" scoped>
.display{
    position: relative;
    z-index: 0;
    margin-left: 2vw;

    .title{
        font-family: 'Noto Serif SC';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        color: #000000;

        margin:0 auto;
    }
}

.content{
    margin: 1vh auto;
    display: flex;
    width: 99%;
    

    .text{
        font-family: 'Noto Serif SC';
        width: 95%;
        position: relative;
        height: auto;
        .text-img-box{
            width: 100%;
            overflow: hidden;
        }
        .text-img{
            width: 100%;
            height: auto;
        }

        .text-sorce{
            font-family: 'Noto Serif SC';
            font-style: 200;
            background-color:#ffffff;
            padding-top: 10px;
            width: 100%;
        }

    }

}



.display{
    margin-top: 1vh;
}

.text-head-inf{
    display: flex;
    justify-content: space-between;
    width: 95%;
}
.information{
    font-family: 'Noto Serif SC';
    font-style: normal;
    font-size: 10px;
    font-weight: normal;

}
</style>

<style>
</style>