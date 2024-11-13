<script lang="ts" setup>
import { computed, ref } from 'vue';

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
    },
    {
      name: 'x',
      type: 'times'
    },
    {
      name: '÷',
      type: 'divide'
    }
  ]
};
const symbol = computed(() => symbols.list[symbols.index.value]);
const num1 = ref('');
const num2 = ref('');
const nums = '0.00011001100110011001100110011001100110011001100110011010'.split('')
</script>

<template>
  <div>
    <div class="input-view">
      <input class="input" type="number" v-model="num1" />
      <span
        :class="['button', { active: symbols.index.value === index }]"
        v-for="(item, index) of symbols.list"
        :key="item.type"
        @click="symbols.index.value = index"
      >
        {{ item.name }}
      </span>
      <input class="input" type="number" v-model="num2" />
      <button class="button active">确认</button>
    </div>
    <h5>十进制转二进制</h5>
    <table>
      <thead>
        <tr>
          <th>请输入</th>
          <th>精度</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input class="input number" type="number" />
          </td>
          <td>
            <input class="input precision" type="number" />
          </td>
          <td>
            <button class="btn">确认</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="output">输出：123</div>
    <h5>二进制转十进制</h5>
    <table>
      <thead>
        <tr>
          <th>请输入</th>
          <th>精度</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input class="input number" type="number" />
          </td>
          <td>
            <input class="input precision" type="number"/>
          </td>
          <td>
            <button class="btn">确认</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="output">输出：123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123</div>
    <table>
      <tr>
        <td v-for="(item, index) of nums" :key="index">{{ item }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
h5 {
  margin-top: 30px;
}
table {
  display: table;
  border-collapse: collapse;
  border-spacing: 0px;
  margin: 10px 0;
  th {
    display: table-cell;
  }
}

.input {
  background-color: #ffffff;
  color: #333333;
  padding: 0 4px;
  &.number {
    width: 480px;
  }
  &.precision {
    width: 50px;
  }
}
.input-view {
  display: flex;
  align-items: center;

  .button {
    display: inline-block;
    background-color: #ffffff;
    color: #333333;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
    &.active {
      background-color: goldenrod;
      &:hover {
        background-color: #d49a06;
      }
    }
  }
}
</style>
