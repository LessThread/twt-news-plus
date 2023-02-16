<template>
    <div class="sidebar">
        <div class="title-box" v-for="(item, index) in titles" :key="index">
            <el-button type="primary" class="title"
            @click="changeFilter(index)"
            plain
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
        const titles =  ref(['全部','竞赛','社团公告','通知','活动','新闻']);
        const img_src = ref([
                    require('../assets/calendar.svg'),
                    require('../assets/pen-tool.svg'),
                    require('../assets/flag.svg'),
                    require('../assets/radio.svg'),
                    require('../assets/tag.svg'),
                    require('../assets/file-minus.svg'),
                    ])
        
        const Store = useStore()
        function changeFilter(index:number){
            Store.commit('clearHiddenNum');
            Store.commit('changeArtFilter',index);
        }
        return {
            titles,
            img_src,
            changeFilter
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
        height: 5vh;
        margin-top: 1vh;
        display: flex;
        :hover{
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
            text-align: center;
            display: flex;
            justify-content: space-between;
            border-style: none;
            background-color: #FAFAFA;
            color:#2a2a2a;
            .title-text{
                margin-left: 1vw;
            }
        }
    }
}
</style>