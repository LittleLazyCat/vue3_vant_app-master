<template>
    <div> 
        <h1>总价: {{totalPrice}}元</h1>
        <h1>总重量: {{totalZhong}}公斤</h1>
        <table>
            <tr>
                <td style="width: 15%;">单价： </td>
                <td  style="width: 35%;"> <form  style="font-size:large;font-weight: bold;" >
                        <input style="width:35%;"  type="text"  v-model.number="price" ref="inputPriceBound">元
                     </form>
                </td>
                <td style="width: 30%;">
                    <van-button  type="primary" class="commit-btn" @click="updatePrice">一键改价</van-button>
                </td>
            </tr>
            <tr>
                <td>
                    名称：
                </td>
                <td>
                    <select  id="id1" style="font-size: x-large;" v-model="name">
                        <option disabled value="select"> 请选择产品</option>
                        <option value="打包带" >打包带</option>
                        <option value="防水布">防水布</option>
                        <option value="白纸">白纸</option>
                        <option value="废纸">废纸</option>
                        <option value=""></option>
                    </select>
                </td>
                <td>
                    
                </td>
            </tr>
            <tr>
                <td>
                    备注：
                </td>
                <td>
                    <form style="font-size:large;font-weight: bold;"> 
                        <input style="width:35%;" type="text" v-model="content">
                    </form>
                </td>
                <td>
                    
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
                <td>
                    
                </td>
            </tr> 
        </table> 
        <van-button  type="primary" class="commit-btn" @click="insert">添加</van-button>
        <br>
        <ul v-if="list.length !== 0">
            <li v-for="(item,index) in list" :key="item" style="font-size:x-large;font-weight: bold;">
                <p>名称：{{item['name']}}；单价：{{item['price']}}元/公斤；重量：{{item['count']}}公斤</p>
                <van-button @click="() => delThisItem(index)" class="commit-btn">删 &nbsp;  &nbsp; 除&nbsp;  &nbsp; 上&nbsp;  &nbsp; 方&nbsp;  &nbsp; 称&nbsp;  &nbsp; 重&nbsp;  &nbsp; 记&nbsp;  &nbsp; 录</van-button>
            </li> 
        </ul> 
    </div>
</template>
<script setup lang='ts'>
import { countDownProps } from 'vant';
import { computed, nextTick, onMounted } from 'vue';
import { reactive, ref } from 'vue';

 
 const content = ref("")
 const price = ref()
 const name  = ref("")
 const zhongliang = ref()

  
 const totalZhong = computed(() =>{
    let all = 0
    list.value.forEach( (v: { [x: string]: number; }) =>{
            all += v['count'];
        
    
})
    return all.toFixed(2)
 })
 const totalPrice = computed(()=>{
    let sum = 0;
    list.value.forEach( (v: { [x: string]: number; }) =>{
    sum += (v['price'] * v["count"]);
})
    return sum.toFixed(2)
 })


 
let list:any|null = ref([])

function insert(){ 
    if(price.value > 0 && zhongliang.value > 0){
        if(name.value == "" && content.value == ""){
                name.value = "其他产品"
        }

        list.value.push({name:name.value + content.value,price:price.value,count:zhongliang.value})
        zhongliang.value = "" 
        content.value = ""
    }else{
        alert("数据不完整，无法添加！")
    }

  
}

function delThisItem(index: number){
    if(confirm("是否删除")){ 
        list.value = list.value.filter((item: any,itemIndex: number) => {return itemIndex !== index})
    }
   
}

function updatePrice(){
    list.value.forEach( (v: { [x: string]: any; }) =>{
        v['price'] = price.value
})
}
</script>
<style>
.commit-btn {
    width: 100%; 
    left: 0;
}

</style>