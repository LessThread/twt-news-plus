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
                    placeholder="青春一路 有歌有光亮"
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
            <el-button type="primary" class="log-button" @click="dialogFormVisible = 1" style="">登录/注册</el-button>

            <div class="login-board" >
                <el-dialog 
                    v-model="dialogFormVisible" 
                    width="30%"
                    top="10%"
                    lock-scroll="true"
                    close-on-click-modal=false
                >
                <template #header="titleId">
                    <div style="height:auto;width:100%" >
                        <p :id="titleId"  style="
                        ont-family:'Noto Sans SC';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 36px;
                        line-height: 52px;
                        text-align: center;"
                        >
                            登录天外天
                        </p>
                    </div>
                </template>
                    <el-form :model="form" 
                    
                    >
                        <el-form-item  >
                            <el-input v-model="form.name" autocomplete="off" class="user-input" placeholder=" 天外天账号/手机号/学号"/>
                        </el-form-item>
                        <el-link href="https://www.twt.edu.cn/home/" target="_blank" style="float:right;color:#00A0E9;">没有账号？</el-link><br/><br/>
                        <el-form-item >
                            <el-input v-model="form.password" autocomplete="off" type="password" show-password placeholder=" 密码" class="user-input"/>
                        </el-form-item>
                        <el-link href="https://www.twt.edu.cn/home/" target="_blank" style="float:right;color:#00A0E9;">忘记密码？</el-link><br/><br/>
                    </el-form>

                        <template #footer>
                        <div style="text-align: center;">
                            <span class="dialog-footer">
                                <el-button type="primary" @click="dialogFormVisible = 0" style="
                                width: 101px;
                                height: 50px;
                                left: 669px;
                                top: 559px;
                                ">

                                <p style="
                                font-family: 'Noto Sans SC';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 20px;
                                line-height: 29px;
                                text-align: center;
                                letter-spacing: 0.122em;
                                color: #FFFFFF;">
                                    确认
                                </p>
                                </el-button>
                            </span>
                        </div>
                        
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
            for(let i=1;i < 4;i++){
                TitleList.value.push(getCategoryNameById(i));
                console.log(getCategoryNameById(i))
            }
        }

        //登录部分
        const form = reactive({
            name: '',
            password:""
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
    .search-box{
        display: flex;
        position: absolute;
        top: 30px;
        left: 22%;
        width: 61%;
        height: 40px;

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
            position: absolute;
            display: flex;
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
        width: 20%;
        height:100px;
        top:0;
    }
    .icon-box{
        z-index: 2;
        position: absolute;
        width: 20%;
        height: 100px;

        .icon{
            position: absolute;
            top:25%;
            width: 30%;
            height: 50%;
            left: 10%;
        }
        .title{
            position: absolute;
            top:25%;
            width: 40%;
            height: 50%;
            left: 40%;
        }
    }

    .link{
        position: absolute;
        display: flex;
        justify-content: space-between;
        
        left: 86%;
        width: 16%;
        top: 30px;


    }
}

/deep/ .user-input{
    .el-input__wrapper{
        box-shadow: 0 0 0; 
        border: none;
    }

}

/deep/ .user-input input{

    width:90%;
    height: 50px;
    left: 494px;
    top: 378px;
    
    background: #FAFAFA;
    border: 1px solid #F0F0F0;
    border-radius: 16px;

}

/deep/
.search-input{
    .el-input__wrapper{
        box-shadow: 0 0 0; 
        border: none;
        background: #F0F0F0;
    }
    input{
        border-radius: 8px;
    }

}


</style>

<style>
.icon-background-hit{
    background-color: #ffffff !important
}

.el-dialog{
    --el-dialog-bg-color:rgba(74, 72, 72, 0) !important;
}

.el-dialog__header{
    height: 70px;
    margin-right:0 !important;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #ffffff !important;
    
}
.el-dialog__body{
    background-color: #ffffff !important;
}
.el-dialog__footer{
    border-bottom-left-radius:  10px;
    border-bottom-right-radius: 10px;
    background-color: #ffffff ;
}
/*.el-dialog__headerbtn{
    width: 10px;
    height: 10px;
    border-style: dashed;
}*/

</style>