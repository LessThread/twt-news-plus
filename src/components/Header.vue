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

        </div>
    </div>
</template>


<style lang="less" scoped>
@width: 3vw;
.header-bar{
    position:static ;
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