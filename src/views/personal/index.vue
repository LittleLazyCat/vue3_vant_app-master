<template>
    <!-- <div style="display: flex;justify-content: center;">
        <van-field name="switch" label="切换主题">
            <template #input>

                <van-switch v-model="checked" @change="changeTheme" />
                <span style="margin-left: 50px;">{{ userStore.getTheme }} 模式</span>
            </template>
        </van-field>
    </div> -->

    <div class="profile-container">
        <header>
            <!-- <van-notice-bar type="info" :scrollable="false">欢迎来到我的个人中心</van-notice-bar> -->
            <!-- <van-cell title="头像" value="" is-link clickable @click="changeAvatar">
                <img :src="fhy" alt="avatar" />
            </van-cell>
            <van-cell title="昵称" :value="nickname" is-link clickable></van-cell> -->
            <div style="display: flex;margin: 10px 0;align-items: center;">
                <img :src="fhy" class="fh-avt" alt="avt" />
                <div style="display: flex;flex-direction: column;">
                    <span style="font-weight: bold;">{{ nickname }}</span>
                    <span style="color: #606060;">{{ phone }}</span>
                </div>
            </div>

        </header>

        <main>
            <van-cell-group>
                <van-cell title="切换主题" is-link clickable @click="openTheme" />
                <van-cell title="绑定手机号码" :value="phone || '未绑定'" is-link clickable @click="goToPhoneBind" />
                <!-- <van-cell title="修改密码" is-link clickable @click="goToPasswordChange" /> -->
                <van-cell title="退出登录" is-link clickable @click="isOut = true" class="logout-btn" />
            </van-cell-group>
        </main>
        <van-action-sheet v-model:show="showTheme" :actions="actions" cancel-text="取消" close-on-click-action
            @select="changeTheme" />
        <van-action-sheet v-model:show="isOut" :actions="[{ name: '退出登录', color: '#ee0a24' }]" cancel-text="取消"
            close-on-click-action @select="logout" />
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";
import fhy from '@/assets/img/a.png'
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

type Theme = {
    name: string
    value: string
}
const router = useRouter()
const userStore = useUserStore()
storeToRefs(userStore)

let checked = ref(false)
let nickname = ref('石之门')
let phone = ref('13434343444')

let showTheme = ref(false);
const actions: Theme[] = [
    { name: '黑夜模式', value: 'dark' },
    { name: '白天模式', value: 'light' },
];

const changeTheme = ({ value }: Theme) => {
    // console.log(val)
    // userStore.changeTheme()
    userStore.changeTheme(value)
}
const openTheme = () => {
    showTheme.value = true
}
let isOut = ref(false)

const logout = (val: any) => {
    router.push({ name: 'login' }) 	// 退出登录

}
const goToPhoneBind = () => { }


</script>
<style scoped>
.profile-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

header {
    /* padding: 0 1rem; */
    height: 150px;
    background: linear-gradient(15deg, #f9d56e 20%, skyblue 80%);
}


main {
    /* padding: 1rem 0; */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
}

:deep(.van-cell__title) {
    font-size: 1rem ;
}

.van-cell__value {
    font-size: 10rem !important;
}

.logout-btn {
    color: red;
}
</style>