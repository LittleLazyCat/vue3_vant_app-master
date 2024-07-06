<template>
    <div> 
        <div>
            <table>
                <tr>
                    <td style="width: 90%;"><h1>总价: {{totalPrice}}元</h1></td>
                    <td></td>
                    <td></td>
                </tr>
                
            </table>
        </div>
       <div>
            <table>
                <tr>
                    <td style="width: 90%;"> <h1>总重量: {{totalZhong}}{{danwei}}</h1></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
       </div>
       
        <table class="input-font">
            <tr>
                <td style="width: 15%;">单价： </td>
                <td  style="width: 35%;"> <form  style="font-size:large;font-weight: bold;" >
                        <input style="width:50%;"  type="text"  v-model.number="price" ref="inputPriceBound">元
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
                    <select style="font-size: x-large;" v-model="name">
                        <option disabled value="select"> 请选择产品</option>
                        <option value="打包带"  aria-checked="true">打包带</option>
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
                        <input style="width:88%;" type="text" v-model="content">
                    </form>
                </td>
                <td>
                    <van-button  type="primary" class="commit-btn" @click="clearAll">一键归零</van-button>
                </td>
            </tr> 
            <tr>
                <td>
                    重量：
                </td>
                <td>
                    <form style="font-size:large;font-weight: bold;">  
                        <input style="width:88%;" type="text" v-model.number="zhongliang">
                    </form>
                </td>
                <td>
                    <select style="font-size: x-large;" v-model="danwei">
                        <option disabled value="select"> 请选择单位</option>
                        <option value="公斤" checked="true">公斤</option>
                        <option value="斤">斤</option>
                        <option value="吨">吨</option> 
                    </select>
                </td>
            </tr> 
        </table> 
        <van-button  type="primary" class="commit-btn" @click="insert">添加</van-button>
        <br>
         
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr> 
                    <th>序号</th>
                    <th>名称</th>
                    <th>单位</th>
                    <th>单价</th>
                    <th>重量</th>
                    <th>操作</th>
                </tr>
            </thead>
           <tbody v-if="list.length !== 0">
            <tr v-for="(item,i) in list" :key="item"> 
                <td>{{i+1}}</td>
                <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center" v-model="item.name"></td>
                <td v-else>{{ item.name }}</td>
                <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center" v-model="item.danwei"></td>
                <td v-else>{{ item.danwei }}</td> 
                <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center" v-model="item.price"></td>
                <td v-else>{{ item.price }}</td> 
                <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center" v-model="item.count"></td>
                <td v-else>{{ item.count }}</td>  
                <td> 
                    <button @click="() => delThisItem(i)" class="btn brn-primary">删除</button>
                </td>
            </tr>
           </tbody>
        </table>
        <br>
        <van-button  v-if="unUpdateRow == false && list.length !== 0" type="primary" class="update-btn" @click="updateRow">修改</van-button>
        <van-button  v-if="unUpdateRow == true && list.length !== 0" type="primary" class="update-btn" @click="saveRow">保存</van-button>
    </div>
</template>
<script setup lang='ts'>
import { computed} from 'vue';
import { reactive, ref } from 'vue';

 
 
const content = ref("")
const price = ref()
const name  = ref("")
const zhongliang = ref()
const danwei=ref("")
const unUpdateRow = ref(false)
 
 
  
const totalZhong = computed(() =>{
    let all = 0
    list.value.forEach( (v: { [x: string]: number; }) =>{
            all += v['count'];
        
    
})
    return all.toFixed(1)
 })
const totalPrice = computed(()=>{
    let sum = 0;
    list.value.forEach( (v: { [x: string]: number; }) =>{
    sum += (v['price'] * v["count"]);
})
    return sum.toFixed(1)
 })


 
let list:any|null = ref([])

function insert(){ 
    if(price.value > 0 && zhongliang.value > 0){
        if(name.value == "" && content.value == ""){
                name.value = "其他产品"
        }
        if(danwei.value.length == 0 ){
            danwei.value = "公斤"
        }
        list.value.push({name:name.value + content.value,price:price.value,count:zhongliang.value,danwei:danwei.value})
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

function updateRow() { 
    unUpdateRow.value = true;
}


function saveRow(){ 
    unUpdateRow.value = false;
}

function clearAll(){  
    if(confirm("是否归零")){ 
    list.value.splice(0, list.value.length);
}
}

</script>
<style>
    .commit-btn {
        width: 100%; 
        left: 0;
    }
    .update-btn {
        width: 100%; 
        left: 0;
        bottom:0;
    }
    .input-font{
        font-weight: bold;
        font-size:large;
    }
</style>