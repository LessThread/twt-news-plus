<template>
    <div class="header-bar">
        <div class="icon-background">
            &emsp;
        </div>
        <div class="icon-box" @click="turn2Home">
            <img src="../assets/icon.svg" class="icon"/>
            <img src="../assets/TWTNews.svg" class="title" />
        </div>
        <div class="search-box">
            <div class="search">
                <el-input  class="search-input"
                    v-model="input"
                    placeholder="Please input"
                    clearable
                >
                    <template #prefix>
                        <el-icon class="el-icon--left">
                        <Search />
                        </el-icon>
                    </template>          
                </el-input>
            </div>
        </div>

        <div class="link">
            <el-link :underline="false">关于我们</el-link>
            <el-link :underline="false">投稿</el-link>
            <el-button type="primary">登录注册</el-button>
        </div>
        
    </div>
</template>

<script lang="ts">
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef} from 'vue'
import router from '@/router';

export default defineComponent({
    name:'Header',
    setup(){
        let input = ref()
        function turn2Home(){
            router.push('/');
        }
        return{
            turn2Home,
            input
        }
    }
})
</script>


<style lang="less" scoped>

@width: 3vw;
@left-dis: 18vw;
@search-box-width:57vw;


.header-bar{
    position:static ;
    .search-box{
        position: absolute;
        left: 20vw;
    }

    .search-box{
        display: flex;
        position: absolute;
        background-color: #fafafa;
        top: 3vh;
        left: @left-dis+2vw;
        width: @search-box-width;
        height: 4vh;

        .search-input{
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

    .icon-background{
        position: absolute;
        z-index: 1;
        background-color: #FaFaFa;
        width: 18vw;
        height:10vh;
        top:0;
    }
    .icon-box{
        z-index: 2;
        position: relative;
        margin-left: 2%;
        margin-top: 1%;
        width: @width;
        height: @width;
        max-width: 50%;
        max-height: 50%;
        .icon{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .title{
            position: absolute;
            width: 250%;
            height: 100%;
            left: 120%;
        }
    }

    .link{
        display: flex;
        justify-content: space-between;
        position: absolute;
        left: @left-dis+@search-box-width + 5vw;
        width: 18vw;
        top: 3vh;
    }
}

</style>