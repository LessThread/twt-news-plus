<template>
    <div class="mobile-header">
        <div class="title-svg">
            <el-image :src="require('../assets/title.svg')"></el-image>
            <el-button type="primary" color="white" @click="drawer = true"><el-icon><Expand /></el-icon></el-button>
        </div>

        <el-drawer
        v-model="drawer"
        title="分类"
        :direction="direction"
        size="50%"
        >
            <div class="mobile-muu-box">
                <el-button text class="mobile-muu" @click="setClass" style="margin-left: 0;">近日新闻</el-button>
                <el-button text class="mobile-muu" @click="setClass" style="margin-left: 0;">校园公告</el-button>
                <el-button text class="mobile-muu" @click="setClass" style="margin-left: 0;">社团风采</el-button>
                <el-button text class="mobile-muu" @click="setClass" style="margin-left: 0;">视点观察</el-button>
                <el-button text class="mobile-muu" @click="setClass" style="margin-left: 0;">院系风采</el-button>
                <el-button text class="mobile-muu" @click="setClass" style="margin-left: 0;">会议概要</el-button>
            </div>
        </el-drawer>
        
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
        const drawer = ref(false)
        const direction = ref('btt')

        function setClass(){
            drawer.value = false
        }

        return{
            drawer,
            direction,
            setClass,
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
</style>



<!-- 全局CSS -->
<style lang="less">
</style>