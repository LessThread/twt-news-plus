<template>
    <div>
        <Sidebar/>
        <div class="main-view">

            <div class="carousel">
                <el-carousel 
                indicator-position="outside"
                height="400px"
                >
                    <div class="carouse-text">
                        asdsad
                    </div>
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="view-text">
                <div v-for="index in 10" :key="index">
                    <h3>{{index}}</h3>
                    <hr/>
                    <img src="https://i.328888.xyz/2023/01/22/O5Qfo.jpeg"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import Sidebar from '../components/MainSidebar.vue'

@Options({
    components: {
        Sidebar
    },
})

export default class  MainView extends Vue{

}
</script>

<style scoped lang="less">
@cwidth : 40%;
@border-r : 8px;
.main-view{
    background-color: rgba(133, 136, 134, 0.115);
    position: absolute;
    z-index: -1;
    left: 18.5vw;
    width: 60vw;
    border-radius: @border-r;
    .carousel{
        width: 100%;
        .carouse-text{
            position: absolute;
            z-index: 2;
            background-color: #FFA156;
            border-top-right-radius: @border-r;
            border-bottom-right-radius: @border-r;
            width: @cwidth;
            height: 100%;
            left:100%-@cwidth;


        }
        
    }
    .view-text{

    }
}




</style>

<style lang="less">
@iwidth:20%;
.el-carousel__indicators--outside{
    background-color: #FFA156;
    position: absolute;
    width: @iwidth;
    left:100%-@iwidth;
    button{
        height: 6px;
        border-radius: 20%;
    }
}
</style>