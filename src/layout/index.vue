<template>
    <div class="content">
        <van-nav-bar class="bar" :title="(title as string)" v-if="showBack" />
       <van-nav-bar class="bar" :title="(title as string)" :left-text="''" left-arrow @click-left="onClickLeft" v-else />
        <div class="main">
            <RouterView></RouterView>
        </div>
        <van-tabbar v-model="active" route v-if="userStore.getBar">
            <van-tabbar-item v-for="item in barLIst" :to="item.path" :name="item.name" :icon="item.icon">
                {{ item.title }}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref, toRef, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'

type Bar = {
    path: string
    name: string
    icon: string
    title: string
}
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 
let title = ref('')
let showBack = ref(true)

const barLIst: Bar[] = [
    {
        path: '/home',
        name: 'home',
        icon: 'home-o',
        title: '首页'
    },
    {
        path: '/search',
        name: 'search',
        icon: 'search',
        title: '发现'

    },
    {
        path: '/collection',
        name: 'collection',
        icon: 'star-o',
        title: '收藏'

    },
    {
        path: '/personal',
        name: 'personal',
        icon: 'friends-o',
        title: '我的'

    },
]

// const { meta: { title, showBack } } = toRef(route)
// 监听路由变化 获取对应标题
watchEffect(() => {
    if (route.path) {
        console.log(route.path)
        console.log(route.meta.title)
        title.value = route.meta.title as string
        showBack.value = route.meta.showBack as boolean ?? false
         userStore.setBar(route.path)
    }
})

const active = ref('home');
const onClickLeft = () => {
   // history.back()
}

</script>
<style scoped lang="less">
.bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // height: 30px;
    // line-height: 30px;
    // padding: 5px;
    // background-color: pink;

}

.main {
    height: 100%;
    padding: 45px 0;
}

.van-tabbar {
    // background-color: pink;

    // padding: 5px;
    :deep(.van-icon) {
        font-size: 28px;
    }
    :deep(.van-tabbar-item){
        padding: 5px;
    }

    // font-size: 30px;
}
:deep(.van-tabbar--fixed){
    bottom: -3px;
}
</style>