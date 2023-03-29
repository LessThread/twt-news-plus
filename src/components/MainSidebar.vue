<template>
    <div class="sidebar">
        <div class="title-box" v-for="(item, index) in titles" :key="index" >

            <el-button type="primary" class="title"
            @click="changeFilter(index)"
            :class="{'hitButton' : isHit[index]}"
            text
            >
                <img :src="img_src[index]" class="title-img"/>
                <p class="title-text">{{ item }}</p>
            </el-button>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import { defineComponent, ref } from "vue";
import { useStore } from 'vuex'

export default defineComponent({
    setup() {
        //此处在将来留下接口以支持网络请求和编辑
        const titles =  ref(['近日新闻','校园公告','社团风采','视点观察','院系风采','会议概要']);
        const img_src = ref([
                    require('../assets/calendar.svg'),
                    require('../assets/pen-tool.svg'),
                    require('../assets/flag.svg'),
                    require('../assets/radio.svg'),
                    require('../assets/tag.svg'),
                    require('../assets/file-minus.svg'),
                    ])
        
        const isHit = ref([0,0,0,0,0,0])

        const Store = useStore()
        function changeFilter(index:number){
            Store.commit('changeArtFilter',index);
            for(let i=0;i<isHit.value.length;i++){
                isHit.value[i] = 0;
            }
            isHit.value[index] = 1;

        }
        return {
            titles,
            img_src,
            changeFilter,
            isHit
        };
    },
})

</script>



<style lang="less" scoped>


.sidebar{
    position: fixed;
    background-color: #FAFAFA;
    height: 90vh;
    width: 18vw;
    display: flex;
    flex-direction:column;
    .title-box{
        background-color: #FAFAFA;
        width: 100%;
        height: 6vh;
        margin-top: 1vh;
        display: flex;
        &:hover{
            font-weight: bold;
            color: black;
        }
        :focus{
            background-color: #F0F0F0;
        }
        .el-button:focus{
            background-color: #F0F0F0;
        }
        .title{
            border-radius: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            justify-content: space-between;
            border-style: none;
            background-color: #FAFAFA;
            color:#2a2a2a;
            overflow: hidden;
            .title-text{
                width:100%;
                margin-left: 1vw;
                text-align: left;

                font-family: 'Noto Sans SC';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 29px;
                color: #767676;

                &:hover{
                    font-weight: bold;
                    color: black;
                }
            }
            .title-img{
                margin-left: 2vw;
            }
        }
    }
}
</style>

<style lang="less" scoped>
.hitButton{
    background-color: #7676761d !important ;
}
</style>