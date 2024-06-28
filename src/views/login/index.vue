<template>
    <div class="container">
        <img src="../../assets/img/a.png" alt="logo" />

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" style="font-weight: bold;font-size: 16px;"> 登 录
                </van-button>
            </div>
        </van-form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { showFailToast } from 'vant'
// import axios from 'axios' // 

type Result = {
    code?: number,
    data?: any,
    msg?: string
}

let password = ref()
let username = ref()

const login = () => { }

const router = useRouter() // 这里使用vue-router的API来访问页面。也可以使用其他页面的API。也

const request = axios.create({
    timeout: 5000,
    baseURL: 'http://localhost:8888',  // 这里填写你的网络请求地址 ，比如你
    headers: { 'Content-Type': 'application/json' } // 这里填写请求头 或者自己给出一个字符串 ，比如请求头部的Content-Type:application/json 

})

const onSubmit = async (params: any, q: any) => {
    params.username = username.value.trim() // 去掉空格 
    params.password = password.value.trim()
    let result: any = await request.post('/users/login', params).catch(e => router.push('/home'))
    if (result?.data?.code == 200) { router.push('/home') } else { showFailToast('账号或密码错误！') }



    // 这里发送POST请求，并将其转换为json 或 将response转换为json
}


</script>
  
<style scoped lang="less">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    img {
        width: 100%;
        margin-bottom: 20px;
        margin: 0 10px;
        border-radius: 5px;

    }
}
</style>