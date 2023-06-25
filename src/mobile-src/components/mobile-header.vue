<template>
    <div class="mobile-header">
        <div class="title-svg" @click="turn2Home">
            <el-image :src="require('../assets/title.svg')"></el-image>

            <el-popover 
                
                placement="top" 
                :width="160"
                trigger="click"
            >
                <div class="menu">
                    <el-button class="men-but" v-for="(item,index) in title_list" :key="index">{{item}}</el-button>
                </div>
                <template #reference>
                    <el-button type="primary" color="white" ><el-icon><Expand /></el-icon></el-button>
                </template>
            </el-popover>

        </div>

        
        
    </div>
</template>

<script lang="ts">
import {defineComponent,computed,ref,watch,onMounted,reactive,toRefs,toRef} from 'vue'
import router from '@/router';
import { useRouter } from 'vue-router';
import {getCategoryNameById} from '@/api/api'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
    name:'MHeader',
    setup(){
        //const visible = ref(false)
        const title_list = ref(['近日新闻','校园公告','社团风采','视点观察','院系风采','会议概要'])
        function turn2Home(){
            router.push('/');
        }

        return{
            turn2Home,
            title_list,
        }
    
    }

})
</script>


<!-- 局部CSS -->
<style lang="less" scoped>
.mobile-header{
    width: 90vw;
    margin: 0 auto;
}
.title-svg{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.mobile-muu-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
}
.mobile-muu{
    left: 0;
    position: initial;
}
.menu{
    display: flex;
    flex-direction:column;
}
.men-but{
    margin-left: 0 !important;
    border: 0;
}
</style>



<!-- 全局CSS -->
<style lang="less">
</style>