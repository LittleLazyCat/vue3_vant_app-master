<template>
    <div>
        <h1>称重列表</h1>
        <h1>总价: {{totalPrice}}</h1>
        <form>
           单价： <input type="text" v-model.number="price">
        </form>
        <form @submit.prevent="insert">
           名称： <input type="text" v-model="name">
           <br>
           重量： <input type="text" v-model.number="zhongliang">
           <br>
            <button>添加</button>
        </form>
        <ul v-if="list.length !== 0">
            <li v-for="(item,index) in list" :key="item">
                <p>名称：{{item.name}} ; 单价：{{item.price}} 元/公斤; 重量： {{item.count}}公斤</p>
                <button  @click="() => delThisItem(index)">删除</button>
            </li> 
        </ul> 
    </div>
</template>
<script setup lang='ts'>
import { computed } from 'vue';
import { reactive, ref } from 'vue';

 

 const price = ref(0)
 const totalPrice = computed(()=>{
    let sum = 0;
    list.value.forEach( v =>{
    sum += (v.price * v.count);
})
    return sum.toFixed(2)
 })
 const name  = ref("")
 const zhongliang = ref(0)

 
let list = ref([])

function insert(){ 

    list.value.push({name:name.value,price:price.value,count:zhongliang.value})
     
}

function delThisItem(index: number){
    if(confirm("是否删除")){ 
        list.value = list.value.filter((item,itemIndex) => {return itemIndex !== index})
    }
   

}


</script>
<style></style>