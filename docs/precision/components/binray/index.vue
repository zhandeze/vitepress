<script setup>
import { useData } from 'vitepress';
import { computed, reactive, useTemplateRef } from 'vue';
import { decimalToBinary, binaryToDecimal, binaryPlus, binaryMinus } from './utils';
import Result from './result.vue';

const symbols = reactive({
  index: 0,
  list: [
    {
      name: '+',
      type: 'plus',
      handler: binaryPlus
    },
    {
      name: '-',
      type: 'minus',
      handler: binaryMinus
    }
  ]
});
const symbol = computed(() => symbols.list[symbols.index]);

const input1 = reactive({
  num: '', // 1.9999999999999998
  precision: '54',
  result: null
});
const input2 = reactive({
  num: '',
  result: ''
});
const input3 = reactive({
  num1: '',
  num2: '',
  result1: null,
  result2: null,
  result: null,
  decimal: null
});

const inputRef2 = useTemplateRef('inputRef2');

function onInputKeyupChange(e) {
  if (['+', '-'].includes(e.key)) {
    input3.num1 = input3.num1.slice(0, -1);
    symbols.index = symbols.list.findIndex((item) => item.name === e.key);
    inputRef2.value.select();
    inputRef2.value.focus();
  }
}
function toNumber(num) {
  if (num === '') {
    throw new Error('不能为空');
  }
  num = Number(num);
  if (isNaN(num)) {
    throw new Error('请输入数字');
  }
  return num;
}
function onConfirmClick1() {
  input1.result = decimalToBinary(toNumber(input1.num));
}
function onConfirmClick2() {
  input2.result = binaryToDecimal(input2.num);
}
function onConfirmClick3() {
  const num1 = toNumber(input3.num1);
  const num2 = toNumber(input3.num2);
  input3.result = symbol.value.handler(num1, num2);
}
function isActive(result, type, index) {
  const str = result[type];
  const start = result[type + 'start'];
  const end = str.length - 1 - result[type + 'end'];
  return index < start || index > end;
}
</script>

<template>
  <div class="container">
    <div class="top-view">
      <h5>十进制转二进制</h5>
      <form action="#" @submit.prevent="onConfirmClick1">
        <table class="table1">
          <thead>
            <tr>
              <th>数字</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input v-model.trim="input1.num" class="input number" placeholder="请输入数字" />
              </td>
              <td>
                <button type="submit" class="button active">确认</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Result :result="input1.result" />
      <h5 style="margin-top: 30px">二进制转十进制</h5>
      <form action="#" @submit.prevent="onConfirmClick2">
        <table class="table1">
          <thead>
            <tr>
              <th>请输入</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input v-model.trim="input2.num" class="input number" placeholder="请输入数字" />
              </td>
              <td>
                <button class="button active" type="submit">确认</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div class="output">输出：{{ input2.result }}</div>
      <form action="#" @submit.prevent="onConfirmClick3">
        <div class="input-view">
          <input class="input" v-model="input3.num1" placeholder="请输入数字" @keyup="onInputKeyupChange" />
          <span
            :class="['button', { active: symbols.index === index }]"
            v-for="(item, index) of symbols.list"
            :key="item.type"
            @click="symbols.index = index"
          >
            {{ item.name }}
          </span>
          <input ref="inputRef2" class="input" v-model="input3.num2" placeholder="请输入数字" />
          <button class="button active" type="submit">确认</button>
        </div>
      </form>
      <template v-if="input3.result">
        <Result :result="input3.result.num1" style="margin: 12px 0 40px 0" />
        <Result :result="input3.result.num2" />
        <div style="margin-top: 30px">
          <div>运算结果：</div>
          <table>
            <tbody>
              <tr>
                <td
                  v-for="(item, index) of input3.result.a"
                  :key="index"
                  :class="[{ active1: isActive(input3.result, 'a', index) }]"
                >
                  {{ item }}
                </td>
              </tr>
              <tr v-if="input3.result.borrows" class="tr-borrows">
                <td v-for="(item, index) of input3.result.borrows" :key="index">
                  {{ item || '' }}
                </td>
              </tr>
              <tr v-if="input3.result.borroweds" class="tr-borroweds">
                <td v-for="(item, index) of input3.result.borroweds" :key="index">
                  {{ item }}
                </td>
              </tr>
              <tr>
                <td
                  v-for="(item, index) of input3.result.b"
                  :key="index"
                  :class="[{ active1: isActive(input3.result, 'b', index) }]"
                >
                  {{ item }}
                </td>
              </tr>
              <tr v-if="input3.result.carry" class="tr-carry">
                <td v-for="(item, index) of input3.result.carry" :key="index">
                  {{ item == 1 ? item : '' }}
                </td>
              </tr>
              <tr>
                <td v-for="(item, index) of input3.result.result" :key="index">{{ item }}</td>
              </tr>
            </tbody>
          </table>
          <div>运算方式：二进制{{ input3.result.minus ? '减法' : '加法' }}</div>
          <div>二进制结果：{{ input3.result.result }}</div>
          <div>二转十结果：{{ input3.result.value }}</div>
          <div>js运算：{{ input3.result.expression }}</div>
          <div>蓝色0：长度不一致时所补的0</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container :deep(table) {
  display: table;
  border-collapse: collapse;
  border-spacing: 0px;
  margin: 10px 0;
  th {
    display: table-cell;
    font-size: 14px;
    background-color: #1f1f1f;
  }
  &,
  th,
  td {
    border: 1px solid #333;
  }
  td {
    padding: 4px;
  }
  td.active1 {
    color: #a8b1ff;
    font-weight: 500;
  }
  .tr-carry {
    color: #8a5402;
    font-weight: 500;
  }
  .tr-borrows {
    color: slateblue;
  }
}
.button {
  display: inline-block;
  background-color: #ffffff;
  color: #333333;
  padding: 0 12px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &.active {
    background-color: goldenrod;
    &:hover {
      background-color: #fabb1d;
    }
  }
  & + .button {
    margin-right: 5px;
  }
}
.container {
  padding: 20px;
  .top-view {
    width: 1000px;
    margin: 0 auto;
  }
}

.container {
  .input {
    background-color: #ffffff;
    color: #333333;
    padding: 0 8px;
    display: block;
    height: 32px;
    &::placeholder {
      color: #333;
    }
    &.number {
      width: 580px;
    }
    &.precision {
      width: 100px;
    }
  }
  .input-view {
    display: flex;
    align-items: center;
    margin-top: 30px;
    .button {
      margin: 0 5px;
    }
  }
}
</style>
