<template>
    <div>
        <van-search v-model="value" shape="round" background="#609080" placeholder="请输入搜索关键词" />
        <van-empty image="search" description="暂无内容" />
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';

let value = ref()


</script>
<style></style>