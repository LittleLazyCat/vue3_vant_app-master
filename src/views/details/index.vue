<template>
    <div class="goods-detail-container">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image" style="padding: 0 10px;">
                <!-- <img class="swipe-img" :src="image" /> -->
                <van-image :src="image" fit="contain" class="goods-img" @click="imgPreview" />
            </van-swipe-item>
        </van-swipe>

        <div class="goods-detail-wrap">
            <p class="goods-title">{{ goods.title }}</p>
            <p class="goods-price-wrap">
                <span class="goods-price">¥{{ goods.price }}</span>
                <van-tag type="primary">包邮</van-tag>
            </p>
            <van-divider dashed />
            <p class="goods-info">颜色分类: {{ goods.color }}</p>
            <p class="goods-info">尺码: {{ size }}</p>
            <van-stepper class="buy-count" v-model="count" :min="1" :max="10" show-plus-minus disabled-input />
            <van-button type="warning" class="add-cart-btn" @click="handleAddCart">加入购物车</van-button>
        </div>

    </div>
</template>
  
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { showSuccessToast, showImagePreview, ImagePreview } from 'vant';



const dummyData = {
    id: '1',
    title: '商品标题1',
    price: '199.00',
    imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    color: '黑色',
};

const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]
const imgPreview = () => {
    showImagePreview({
        images,
        startPosition: 1,
    });
}


const goods = ref(dummyData);
const count = ref(1);
const size = ref('L');

const handleAddCart = () => {
    console.log(`添加到购物车：${goods.value.title}, 数量：${count.value}, 尺码：${size.value}`);
    showSuccessToast('添加成功');
}

</script>
  
<style scoped>
.goods-detail-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.goods-img {
    width: 100%;
    max-height: 60vh;
    margin-bottom: 1rem;
}

.goods-detail-wrap {
    padding: 0 1rem;
}

.goods-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.goods-price-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.goods-price {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1rem;
}

.goods-info {
    margin-bottom: 0.5rem;
}

.buy-count {
    margin-top: 1rem;
    margin-bottom: 2rem;
}

.add-cart-btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>