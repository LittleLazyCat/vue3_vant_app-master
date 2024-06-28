<template>
    <div> 
       
        <h1>总价: {{totalPrice}}元</h1>
        <br>
        <table>
            <tr>
                <td>单价： </td>
                <td> <form  style="font-size:large;font-weight: bold;" >
                        <input style="width:35%;"  type="text"  v-model.number="price">元
                     </form>
                </td>
            </tr>
            <tr>
                <td>
                    名称：
                </td>
                <td>
                    <select  id="id1" style="font-size: x-large;" v-model="education">
                        <option disabled value="select"> 请选择产品</option>
                        <option value="打包带" >打包带</option>
                        <option value="防水布">防水布</option>
                        <option value="白纸">白纸</option>
                        <option value="废纸">废纸</option>
                        <option value=""></option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    备注：
                </td>
                <td>
                    <form style="font-size:large;font-weight: bold;"> 
                        <input style="width:35%;" type="text" v-model="name">
                    </form>
                </td>
            </tr>

            <tr>
                <td>
                    重量：
                </td>
                <td>
                    <form style="font-size:large;font-weight: bold;">  
                        <input style="width:35%;" type="text" v-model.number="zhongliang">公斤
                    </form>
                </td>
            </tr> 
        </table> 
        <van-button  type="primary" class="commit-btn" @click="insert">添加</van-button>
        <br>
        <ul v-if="list.length !== 0" style="font-size:xx-large;">
            <li v-for="(item,index) in list" :key="item">
                <p>名称：{{item.name}}；单价：{{item.price}}元/公斤；重量：{{item.count}}公斤</p>
                <van-button @click="() => delThisItem(index)">删除</van-button>
            </li> 
        </ul> 
    </div>
</template>
<script setup lang='ts'>
import { computed } from 'vue';
import { reactive, ref } from 'vue';

 
 const education = ref("")
 const price = ref()

 const totalPrice = computed(()=>{
    let sum = 0;
    list.value.forEach( v =>{
    sum += (v.price * v.count);
})
    return sum.toFixed(2)
 })
 const name  = ref("")
 const zhongliang = ref()

 
let list = ref([])

function insert(){ 

    list.value.push({name:education.value + name.value,price:price.value,count:zhongliang.value})
     
}

function delThisItem(index: number){
    if(confirm("是否删除")){ 
        list.value = list.value.filter((item,itemIndex) => {return itemIndex !== index})
    }
   

}


</script>
<style>
.commit-btn {
    width: 100%; 
    left: 0;
}

</style>