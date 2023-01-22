<template>
    <div class="header-bar">
        <div class="icon-background">
            &emsp;
        </div>
        <div class="icon-box">
            <img src="../assets/icon.svg" class="icon"/>
            <img src="../assets/TWTNews.svg" class="title" />
        </div>
        <div class="search-box">
            <!-- <img src="../assets/search.svg" class="search-icon" /> -->
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
    </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';

@Options({
    props: {
        input:String
    }
})


export default class Header extends Vue {
    input!: string;

}
</script>


<style lang="less" scoped>

@width: 3vw;
@left-dis: 20vw;


.header-bar{
    position:static ;
    .search-box{
        position: absolute;
        left: 20vw;
    }

    .search-box{
        display: flex;
        position: absolute;
        background-color: wheat;
        top: 3vh;
        left: @left-dis+3vw;
        width: 50vw;
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
        background-color: #F0F0F0;
        width: 20vw;
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
}

</style>