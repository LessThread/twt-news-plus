<template>
    <div class="display">

        <div class="title">
            冯院叶底藏秋声 群英捧袂少年腾
        </div>

        <div class="content">

            <div class="side">
                <div>time</div>
                <div>tag</div>
                <div>writer</div>
                <div>QR</div>
            </div>

            <div class="line">
                <div class="sx"></div>
            </div>

            <div class="text">
                <div>
                    <div class="text-img-box">
                        <el-image src="https://i.328888.xyz/2023/01/22/O5Qfo.jpeg" class="text-img"/>
                    </div>
                    <div>
                        <div v-for="index in 25" :key="index">{{ index }}hi</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
        };
    },
})

</script>

<style lang="less" scoped>
.display{
    z-index: -1;
}

.content{
    display: flex;
    width: 100%;
    min-height: 80vh;
    padding-left: 1%;
    padding-right: 1%;
    .side{
        width: 18%;
        background-color: aquamarine;
    }
    .line{
        width: 2%;
        .sx{
            margin: 0 auto;
            width: 2px;
            height: 100%;
            background: rgba(13, 13, 14, 0.842);
        }
    }
    .text{
        width: 78%;
        background-color: rgba(36, 102, 80, 0.367);
        .text-img-box{
            width: 100%;
            overflow: hidden;
            height: 50vh;
        }
        .text-img{
            width: 100%;
        }
    }
}
</style>