<script setup>
import { useData } from 'vitepress';
import { computed, reactive, ref } from 'vue';
import { decimalToBinary, binaryToDecimal } from './utils';
import Result from './result.vue';
const { isDark } = useData();
const symbols = {
  index: ref(0),
  list: [
    {
      name: '+',
      type: 'plus'
    },
    {
      name: '-',
      type: 'minus'
    }
  ]
};
const symbol = computed(() => symbols.list[symbols.index.value]);

const input1 = reactive({
  num: '1.9999999999999998',
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
  result: null
});
function toNumber(num) {
  if (num === '') {
    throw new Error('不能为空');
  }
  num = Number(num);
  if (isNaN(num)) {
    throw new Error('请输入数字');
  }
  console.log('[num]:', num);
  return num;
}
function onConfirmClick1() {
  input1.result = decimalToBinary(toNumber(input1.num));
}
function onConfirmClick2() {
  input2.result = binaryToDecimal(input2.num);
}
function onConfirmClick3() {
  const num1 = toNumber(input3.num1)
  const num2 = toNumber(input3.num2)
  input3.result1 = decimalToBinary(num1)
  input3.result2 = decimalToBinary(num2)
}
</script>

<template>
  <div class="container" :name="isDark ? 'dark' : null">
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
          <input class="input" v-model="input3.num1" placeholder="请输入数字" />
          <span
            :class="['button', { active: symbols.index.value === index }]"
            v-for="(item, index) of symbols.list"
            :key="item.type"
            @click="symbols.index.value = index"
          >
            {{ item.name }}
          </span>
          <input class="input" v-model="input3.num2" placeholder="请输入数字" />
          <button class="button active" type="submit">确认</button>
        </div>
      </form>
      <Result :result="input3.result1" style="margin: 12px 0 40px 0;"/>
      <Result :result="input3.result2"/>
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

.container[name='dark'] {
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
