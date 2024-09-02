<template>
    <div class="background-color">
        <div>
            <table>
                <tr>
                    <td style="width: 90%;color: black;">
                        <h1>总价: {{ totalPrice }}元</h1>
                    </td>
                    <td></td>
                    <td></td>
                </tr>

            </table>
        </div>
        <div>
            <table>
                <tr>
                    <td style="width: 90%;color: black;">
                        <h1>总重量: {{ totalZhong }}{{ danwei }}</h1>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>

        <table class="table">
            <tr>
                <td class="td" :style="{ color: priceColor }">单&nbsp;&nbsp;价：</td>
                <td class="td">
                    <form style="font-size:large;font-weight: bold;">
                        <input style="width:70%;" type="text" @click="inputPrice" keyboard="true" data-mode="di_git"
                            readonly v-model.number="price" ref="inputPriceBound">元
                    </form>
                    <keyboard :transitionTime="'0.5s'" :maxQuantify="10" :showKeyboard="showKeyboard"
                        @clickKey="clickKey" float :manyDict="manyDict" :singleDict="singleDict"
                        @clickNumber="clickNumber" :blurHide="true"></keyboard>
                </td>
                <td class="td">
                    <van-button type="primary" class="commit-btn" @click="updatePrice">一键改价</van-button>
                </td>
            </tr>
            <tr>
                <td class="td">
                    
                    名&nbsp;&nbsp;称：
                </td>
                <td>
                    <van-field v-model="fieldValue" is-link readonly label="" placeholder="请选择产品"
                        @click="showPicker = true" />
                    <van-popup v-model:show="showPicker" round position="bottom">
                        <van-picker :columns="name" @cancel="showPicker = false" @confirm="onConfirm" />
                    </van-popup>
                    <!--
                    <select style="font-size: x-large;" v-model="name">
                        <option disabled value="select"> 请选择产品</option>
                        <option value="打包带"  aria-checked="true">打包带</option>
                        <option value="防水布">防水布</option>
                        <option value="白纸">白纸</option>
                        <option value="废纸">废纸</option>
                        <option value=""></option>
                    </select>
                    -->
                </td>
                <td>

                </td>
            </tr>
            <tr>
                <td>
                    备&nbsp;&nbsp;注：
                </td>
                <td>
                    <form style="font-size:large;font-weight: bold;">
                        <input style="width:88%;" type="text" v-model="content">
                    </form>
                </td>
                <td>
                    <van-button type="primary" class="commit-btn" @click="clearAll">一键归零</van-button>
                </td>
            </tr>
            <tr>
                <td :style="{ color: zhongliangColor }">
                    重&nbsp;&nbsp;量：
                </td>
                <td>
                    <form style="font-size:large;font-weight: bold;">
                        <input style="width:88%;" type="text" @click="inputZhongliang" keyboard="true"
                            data-mode="di_git" readonly v-model.number="zhongliang">
                    </form>

                    <keyboard :transitionTime="'0.5s'" :maxQuantify="10" :showKeyboard="showKeyboard"
                        @clickKey="clickKey" float :manyDict="manyDict" :singleDict="singleDict"
                        @clickNumber="clickNumber" :blurHide="false"></keyboard>
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

        <van-button type="primary" class="commit-btn" @click="insert">添加</van-button>
        <br>

        <table class="table table-striped table-hover table-bordered">
            <thead style="color: black;">
                <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>单位</th>
                    <th>单价</th>
                    <th>重量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="list.length !== 0" style="color: black;">
                <tr v-for="(item, i) in list" :key="item">
                    <td>{{ i + 1 }}</td>
                    <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center"
                            v-model="item.name"></td>
                    <td v-else>{{ item.name }}</td>
                    <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center"
                            v-model="item.danwei"></td>
                    <td v-else>{{ item.danwei }}</td>
                    <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center"
                            v-model="item.price"></td>
                    <td v-else>{{ item.price }}</td>
                    <td v-if="unUpdateRow == true"><input class="form-control form-control-sm" style="text-align:center"
                            readonly v-model="item.count"> </td>
                    <td v-else>{{ item.count }}</td>
                    <td>
                        <button @click="() => delThisItem(i)" class="btn brn-primary">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <van-button v-if="unUpdateRow == false && list.length !== 0" type="primary" class="update-btn"
            @click="updateRow">修改</van-button>
        <van-button v-if="unUpdateRow == true && list.length !== 0" type="primary" class="update-btn"
            @click="saveRow">保存</van-button>
    </div>
</template>
<script setup lang='ts'>
import { computed } from 'vue';
import { reactive, ref } from 'vue';
import { showToast } from 'vant';
import keyboard from "../components/keyboard/keyboardIndex.vue";

const content = ref("")
const price = ref()
//const name  = ref("")
const zhongliang = ref()
const danwei = ref("")
const unUpdateRow = ref(false)
const priceColor = ref('#000000'); // 初始颜色为黑色
const zhongliangColor = ref('#000000'); // 初始颜色为黑色

const value = ref("");
const showKeyboard = ref(false);



const name = [
    { text: '打包带', value: '打包带' },
    { text: '防水布', value: '防水布' },
    { text: '白纸', value: '白纸' },
    { text: '废旧物资', value: '废旧物资' }, 
];
const fieldValue = ref('');
    const showPicker = ref(false);

    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      fieldValue.value = selectedOptions[0].text;
    };




//点击键盘的值
const clickKey = (key) => {
    // console.log("key-->>",key);
}
//点击键盘时数字的值
const clickNumber = (key) => {
    // console.log("key-->>",key);
}
const manyDict = ref("dict/chowder.json")
const singleDict = ref("dict/baseDict.json")





const totalZhong = computed(() => {
    let all = 0
    list.value.forEach((v: { [x: string]: number; }) => {
        all += v['count'];


    })
    return all.toFixed(1)
})
const totalPrice = computed(() => {
    let sum = 0;
    list.value.forEach((v: { [x: string]: number; }) => {
        sum += (v['price'] * v["count"]);
    })
    return sum.toFixed(1)
})



let list: any | null = ref([])

function insert() {
    if (price.value > 0 && zhongliang.value > 0) {
        if (fieldValue.value == "" && content.value == "") {
            fieldValue.value = "其他产品"
        }
        if (danwei.value.length == 0) {
            danwei.value = "公斤"
        }
        list.value.push({ name: fieldValue.value + content.value, price: price.value, count: zhongliang.value, danwei: danwei.value })
        zhongliang.value = ""
        content.value = ""
    } else {
        alert("数据不完整，无法添加！")
    }


}

function delThisItem(index: number) {
    if (confirm("是否删除")) {
        list.value = list.value.filter((item: any, itemIndex: number) => { return itemIndex !== index })
    }

}

function updatePrice() {
    list.value.forEach((v: { [x: string]: any; }) => {
        v['price'] = price.value
    })
}

function updateRow() {
    unUpdateRow.value = true;
}


function saveRow() {
    unUpdateRow.value = false;
}

function clearAll() {
    if (confirm("是否归零")) {
        list.value.splice(0, list.value.length);
    }
}

function inputPrice() {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    zhongliangColor.value = colors[6];
    priceColor.value = colors[0];
}


function inputZhongliang() {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    priceColor.value = colors[6];
    zhongliangColor.value = colors[0];
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
    bottom: 0;
}

.input-font {
    font-weight: bold;
    font-size: large;
    color: black;
}

.background-color {
    background-color: white;
}

.table {
    width: 100%;
    /* 让表格宽度为100% */
    table-layout: auto;
    /* 让单元格宽度能自适应 */
    color: black;
}

.td {

    text-align: left;
    /* 单元格内文本对齐方式 */
    padding: 4px;
    /* 单元格内边距 */
}
</style>