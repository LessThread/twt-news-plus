<template>
    <div>
        <Sidebar/>
        <div class="main-view">

            <div class="carousel">
                <el-carousel 
                indicator-position="outside"
                height="400px"
                id="carID"
                >
                    <div class="carouse-text">
                        asdsad
                    </div>

                    <el-carousel-item v-for="item in 4" :key="item" >
                        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="view-text">
                <!-- <div v-for="index in 10" :key="index">
                    <h3>{{index}}</h3>
                    <hr/>
                    
                </div> -->
                <div class="infinite-list-wrapper" style="overflow: auto">
                    <ul
                        v-infinite-scroll="load"
                        class="list"
                        :infinite-scroll-disabled="disabled"
                        >
                        <div v-for="i in count" :key="i" class="list-item">
                            <p>{{ i }}</p>
                            <!-- z注意要使用图片懒加载 -->
                            <img src="https://i.328888.xyz/2023/01/22/O5Qfo.jpeg"/>
                        </div>
                    </ul>
                    <p v-if="loading">Loading...</p>
                    <p v-if="noMore">No more</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import Sidebar from '../components/MainSidebar.vue';
import {defineComponent,computed,ref} from 'vue'





export default defineComponent({
    components: {
        Sidebar
    },
    setup(){
        const count = ref(10)
        const loading = ref(false)
        const noMore = computed(() => count.value >= 20)
        const disabled = computed(() => loading.value || noMore.value)
        const load = () => {
            loading.value = true;
            setTimeout(() => {
                count.value += 2
                loading.value = false
                }, 1000)
            }
        return{
            count,
            loading,
            disabled,
            noMore,
            load
        }
    }
})
    
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
@i-width:20%;
#carID{
    .el-carousel__indicators{
        position: absolute;
        background-color: #FFA156;
        width: @i-width;
        left:100%-@i-width;
        button{
            height: 6px;
            border-radius: 20%;
        }
    }
}
</style>