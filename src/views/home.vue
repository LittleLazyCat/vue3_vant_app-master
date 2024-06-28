<template>
  <div >
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image" style="padding: 0 10px;">
        <img class="swipe-img" :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="about">
    <van-grid gutter="10px" :border="false">
      <van-grid-item v-for="(item, index) in iconlist" :key="item.id" :to="item.path" :icon="item.icon"
        :text="item.text" />
    </van-grid>
  </div>
  <!-- <div style="display: flex;flex-direction: column;">
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="primary" @click="chnageTheme">主题切换</van-button>
    </div> -->
  <div v-masonry class="container" gutter="15">
    <div v-masonry-tile v-for="(item, index) in i_List" :key="index + item.title">
      <div class="item" @click="toDetail(item.id)">
        <img class="img" :src="item.url" alt="fm" />
        <div class="van-multi-ellipsis--l2 details">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';
import fhy from '@/assets/img/a.png'
import kls from '@/assets/img/kls.png'
import nimg from '@/assets/img/newimg.png'
import router from '@/router';


const s = useUserStore()

const images = [fhy, kls, nimg];

const i_List = [
  {
    url: fhy,
    title: '凤凰院 凶真',
    id: '0'
  },
  {
    url: kls,
    title: '克里斯汀娜',
    id: '01'

  },
  {
    url: fhy,
    title: '凤凰院 凶真',
    id: '02'
  },
  {
    url: kls,
    title: 'Apple 4',
    id: '03'
  },
  {
    url: fhy,
    title: '凤凰院 凶真',
    id: '04'
  },
  {
    url: kls,
    title: '克里斯汀娜',
    id: '5'
  },
  {
    url: nimg,
    title: '靓图',
    id: '0'
  }

]
const active = ref(0);
const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
  },
]);

const iconlist = [
  {
    icon: "video",
    text: '番剧',
    id: '001',
    path: 'deving'
  },
  {
    icon: "music",
    text: '音乐',
    id: '002',
    path: 'deving'

  }, {
    icon: "friends",
    text: '社区',
    id: '003',
    path: 'deving'

  },
  {
    icon: "photo-fail",
    text: '靓图',
    id: '004',
    path: 'deving'

  },
]

const toDetail = (id: string) => {
  router.push(`/detail/${id}`)
}


setTimeout(() => {
  s.$patch({
    token: 'hello im alredy changed!!! again!'
  })
}, 10000)

</script>

<style scoped lang="less">

.img {
  width: 100%;
  height: inherit;
}

.swipe-img {
  width: 100%;
  height: 40vh;
  border-radius: 10px;
}

.container {
  padding: 10px;
  background: #f7f7f8;
  // opacity: .5;

  .item {
    width: 170px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 10px;

    img {
      border-radius: 10px 10px 0 0;

    }

    .details {
      padding: 3px;
      text-align: center;
    }
  }

}

:deep(.van-grid-item__content) {
  padding: 2pxx;
}

:deep(.van-grid-item__content) {
  border-radius: 10px;
  // background-color: pink;
  background: linear-gradient(35deg, skyblue 20%, #f9d56e 80%);
  // background-size: 100% 50px;
  // background-image: -webkit-linear-gradient(30deg,
  //     transparent 0%,
  //     transparent 50%,
  //     rgb(76, 104, 184) 65%,
  //     rgb(76, 104, 184) 70%,
  //     transparent 75%,
  //     transparent);

}

:deep(.van-grid-item__icon) {
  font-size: 30px;
  // color: dodgerblue;
}

.about {
  margin: 10px 0;

}
</style>
