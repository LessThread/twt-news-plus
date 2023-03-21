<template>
    <div class="header-bar">
        <div class="icon-background" :class="{'icon-background-hit':color}">
            &emsp;
        </div>
        <div class="icon-box" @click="turn2Home">
            <img src="../assets/icon.svg" class="icon"/>
            <img src="../assets/TWTNews.svg" class="title" />
        </div>


        <div class="search-box" v-if="!input_box">
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

        <div class="search-box" v-if="input_box">
            <div class="added-button-box">
                <div v-for="(item,index) in TitleList" :key="index" class="added-button">
                    <el-link :underline="false" @click="turn2Home">{{item}}</el-link>
                </div>
            </div>
            <div class="search-mini">
                <el-input  class="search-input"
                    v-model="input"
                    placeholder="No input"
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
            <el-button type="primary" class="log-button" @click="dialogFormVisible = 1">登录/注册</el-button>

            <div class="login-board" >
                <el-dialog v-model="dialogFormVisible" title="Shipping address">
                    <el-form :model="form">
                        <el-form-item label="Promotion name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Zones" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item>
                        </el-form>

                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">
                            Confirm
                            </el-button>
                        </span>
                        </template>

                    </el-dialog>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef} from 'vue'
import router from '@/router';
import { useRouter } from 'vue-router';
import {getCategoryNameById} from '@/api/api'

export default defineComponent({
    name:'Header',
    setup(){
        let input = ref()
        let color = ref(0);
        let dialogFormVisible = ref(0)
        function turn2Home(){
            router.push('/');
        }
        const input_box = ref(0)
        const TitleList = ref([] as any);
        function getList(){
            for(let i=1;i<4;i++){
                TitleList.value.push(getCategoryNameById(i));
                console.log(getCategoryNameById(i))
            }
        }

        //登录部分
        const form = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            })

        //登录函数
        // function login(){
        // };
        
        //路由判断
        watch(()=>router.currentRoute.value.fullPath,()=>{
            let url:string = router.currentRoute.value.fullPath;
            console.log(url.indexOf('Display'))
            if(url.indexOf('Display') !== -1){
                color.value = 1;
                input_box.value = 1;
            }
            else{
                color.value = 0;
                input_box.value = 0;
            }
        })

        onMounted(()=>{
            getList();
        })

        return{
            turn2Home,
            input,
            color,
            input_box,
            TitleList,
            dialogFormVisible,
            form,
        }
    
    }

})
</script>

<style lang="less">
.el-input__wrapper{
    background-color: #f0f0f0;
}
</style>

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

        .search-mini{
            position: absolute;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
        }
        .added-button-box{
            display: flex;
            position: absolute;
            width: 40%;
            justify-content: space-between;
        }
        .added-button{
            font-family: 'Noto Sans SC';
            font-style: normal;
            font-weight: 500;
            font-size: 28px;
            line-height: 29px;
            letter-spacing: -0.003em;
            color: #2A2A2A;
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
        bottom: -1vh;
        height: @width;
        max-width: 50%;
        max-height: 50%;
        .icon{
            position: absolute;
            left: 1vw;
            width: 100%;
            height: 100%;
        }
        .title{
            position: absolute;
            width: 250%;
            height: 100%;
            left: 160%;
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

<style>
.icon-background-hit{
    background-color: #ffffff !important
}
</style>