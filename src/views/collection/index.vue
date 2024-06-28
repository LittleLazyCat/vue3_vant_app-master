<template>
    <div style="margin-bottom: 100px;">
        <van-swipe-cell v-for=" item in productList">
            <van-card :num="item.num" :price="item.price" desc="描述信息" title="商品标题" class="goods-card"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
            </template>
        </van-swipe-cell>
        <p style="text-align: center;padding: 5px;opacity: .5;font-size: small;">没有更多了...</p>

        <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
            </template>
        </van-submit-bar>
    </div>
</template>
<script setup lang='ts'>
import { showToast } from 'vant';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
let checked = ref(false)
const onSubmit = () => {
    router.push('/order')
}
const onClickLink = () => showToast('修改地址');

const productList = [
    {
        num: Math.floor((Math.random()) * 10) + 1,
        price: ((Math.random()) * 100).toFixed(2)
    },
    {
        num: Math.floor((Math.random()) * 10) + 1,
        price: ((Math.random()) * 100).toFixed(2)
    }, {
        num: Math.floor((Math.random()) * 10),
        price: ((Math.random()) * 100).toFixed(2)
    }, {
        num: Math.floor((Math.random()) * 10) + 1,
        price: ((Math.random()) * 100).toFixed(2)
    },
    {
        num: Math.floor((Math.random()) * 10) + 1,
        price: ((Math.random()) * 100).toFixed(2)
    },
    {
        num: Math.floor((Math.random()) * 10) + 1,
        price: ((Math.random()) * 100).toFixed(2)
    },
    {
        num: Math.floor((Math.random()) * 10),
        price: ((Math.random()) * 100).toFixed(2)
    }

]

type obj = { num: number, price: string }
const totalPrice = computed(() => {
    let total_price = 0
    productList.forEach((k: obj, index: number) => {
        total_price += parseFloat(k.price) * k.num;
        console.log(total_price)

    })
    return total_price * 100
})


</script>
<style scoped>
.delete-button {
    height: 100%;
}

:deep(.van-submit-bar) {
    bottom: 46.5px;
}
</style>