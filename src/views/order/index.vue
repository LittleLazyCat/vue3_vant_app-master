<template>
    <div class="pay-order-container">
        <van-field label="收货人" v-model="address.name" type="text" />
        <van-field label="收货人电话" v-model="address.phone" type="text" />
        <van-cell title="收货地址" :border="false" is-link @click="goToAddressPage">{{ address.label }}</van-cell>
        <van-field label="详细地址" v-model="addressDetails" type="text" />
        <van-divider dashed />
        <div class="goods-list">
            <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
                <van-image :src="item.imgUrl" fit="contain" class="img-p" />
                <div class="goods-info-wrap">
                    <p class="goods-title">{{ item.title }}</p>
                    <p class="goods-price">¥{{ item.price }}</p>
                    <p class="goods-count">数量：{{ item.count }}</p>
                </div>
            </div>
        </div>
        <van-divider dashed />
        <div class="total-price-wrap">
            <p>商品总金额：<span class="total-price">¥{{ totalPrice }}</span></p>
            <p>运费：<span class="shipping-fee">¥{{ shippingFee }}</span></p>
            <p>实付款：<span class="actual-price">¥{{ actualPrice }}</span></p>
        </div>
        <van-button type="primary" block class="pay-btn" @click="handlePay">立即支付</van-button>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

const dummyAddress = {
    name: '张三',
    phone: '138****8888',
    area: ['湖南省', '长沙市', '岳麓区'],
    detail: 'xx街道xx小区xx号',
    label: '家',
};

const dummyGoodsList = [
    {
        id: '1',
        title: '商品1',
        price: '199.00',
        imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        count: 2,
    },
    {
        id: '2',
        title: '商品2',
        price: '99.00',
        imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        count: 1,
    },
];

const router = useRouter()

const address = ref(dummyAddress);
let addressDetails = ref('xxx6号')
const goodsList: any = ref(dummyGoodsList);

function goToAddressPage() {
    router.push('/address')
}

function handlePay() {
    console.log('支付成功');
    showToast('支付成功');
}

const totalPrice = ref(
    goodsList.value.reduce((total: any, item: any) => total + item.price * item.count, 0).toFixed(2)
);
const shippingFee = ref('0.00');
const actualPrice = ref((Number(totalPrice.value) + Number(shippingFee.value)).toFixed(2));


</script>

<style scoped>
.pay-order-container {
    padding: 1rem;
}

.goods-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.goods-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
}

.goods-info-wrap {
    margin-left: 1rem;
}

.goods-title {
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.goods-price {
    color: #f60;
    font-weight: bold;
    margin-top: 0.5rem;
}

.total-price-wrap {
    text-align: right;
    margin-bottom: 1rem;
}

.actual-price {
    font-size: 1.2rem;
    color: #f60;
    margin-left: 0.5rem;
}

.pay-btn {
    margin-top: 1rem;
}

.img-p {
    width: 100px;
    height: 100px;
}

</style>