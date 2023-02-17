<template>
    <div class="display">

        <div class="title">
            {{Title}}
        </div>

        <div class="content">

            <div class="side">
                <div>2022</div>
                <div>11.05</div>
                <div>10:38</div>
                <div>QR</div>
            </div>

            <div class="line">
                <div class="sx"></div>
            </div>

            <div class="text">
                <div>
                    <div class="text-img-box">
                        <el-image :src="imgID" class="text-img"/>
                    </div>

                    <div v-html="News" class="text-main">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import { defineComponent, ref ,onMounted } from "vue";
import router from '@/router';
import {getNews,displayImg} from '../api/api'
import { indexOf } from 'lodash';


export default defineComponent({
    setup() {
        const News = ref('Loading')
        const Title = ref('')
        const imgID = ref('')

        async function displayNews(){
            let url = router.currentRoute.value.fullPath;
            const id = url.slice(url.indexOf('?')+2);
            
            await getNews(id)
                .then(res =>{
                    News.value = res.text
                    Title.value = res.title
                    imgID.value = displayImg(res.bannerImageId);
                    console.log(res)
                })

            }

        onMounted(() => {
            displayNews()
        }); 

        return {
            News,
            Title,
            imgID
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
        font-size: 64px;
        margin-left: 1vw;

    }
}

.content{
    display: flex;
    width: 100%;
    min-height: 80vh;
    padding-left: 1%;
    padding-right: 1%;
    .side{
        width: 18%;
        border-style: dashed;
    }
    .line{
        width: 2%;
        .sx{
            margin: 0 auto;
            width: 2px;
            height: 100%;
            background: rgba(13, 13, 14, 0.842);
        }
    }
    .text{
        width: 78%;
        background-color: rgba(36, 102, 80, 0.367);
        position: relative;
        z-index: -1;
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
    }
}
</style>

<style>
</style>