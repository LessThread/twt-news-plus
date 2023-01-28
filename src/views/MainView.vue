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
                <div class="infinite-list-wrapper" style="overflow: auto">
                    <ul
                        v-infinite-scroll="load"
                        class="list"
                        :infinite-scroll-disabled="disabled"
                        > <!-- 无限滚动，注意要使用图片懒加载 -->

                        <div v-for="i in count" :key="i" class="list-item">
                            <div class="list-time">
                                <p>time</p>
                                <hr/>
                            </div>
                            <div class="list-inf">
                                <div class="list-img-box">
                                    <el-image src="https://i.328888.xyz/2023/01/22/O5Qfo.jpeg" lazy class="list-img"/>
                                </div>
                                <div class="list-text-box">
                                    <p class="title">冯院叶底藏秋声 群英捧袂少年腾</p>
                                    <p class="tag">近日新闻+社团</p>
                                    <div class="foot">
                                        <p class="writer">作者</p>
                                        <p class="time">2022.102</p>
                                    </div>
                                </div>   
                            </div>
                        </div>

                    </ul>
                    <p v-if="loading">Loading...</p>
                    <p v-if="noMore" class="end-text">...再也没有更多了...</p>
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
        const noMore = computed(() => count.value >= 10)
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
@main-view-width : 60vw;
.main-view{
    background-color: rgba(133, 136, 134, 0.115);
    position: absolute;
    z-index: -1;
    left: 18.5vw;
    width: @main-view-width;
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
        margin-top: 1vh;
        width: 100%;
        .infinite-list-wrapper{
            width: 95%;
            .list-item{
                background-color: rgba(245, 249, 248, 0.323);
                position: relative;
                margin-top: 10vh;
                height: 25vh;
                .list-inf{
                    display: flex;
                    .list-img-box{
                        position: relative;
                        overflow: hidden;
                        width: 30%;
                    }
                    .list-text-box{
                        width: 70%;
                        .title{
                            width: 100%;
                        }
                        .foot{
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }
            .end-text{
                text-align: center;
            }
            
        }
       
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