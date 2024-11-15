<script setup>
const props = defineProps({
  result: Object
});
</script>

<template>
  <div v-if="result" class="result" style="--labelWidth: auto">
    <div class="field-item">
      <div class="label">原始值：</div>
      <div class="value">{{ result.binary }}（长度{{ result.binary.length }}）</div>
    </div>
    <div class="field-item">
      <div class="label">符号位：</div>
      <div class="value">{{ result.sign }}</div>
    </div>
    <div class="field-item">
      <div class="label">指数位：</div>
      <div class="value">
        <span class="span1">{{ result.exponent }}</span>
        <span class="span1">2 ^ {{ result.index }}</span>
        <span class="span1">{{ result.actualIndex }}</span>
      </div>
    </div>
    <div class="field-item">
      <div class="label">尾数位：</div>
      <div class="value">{{ result.mantissa }}</div>
    </div>
    <div v-if="result.rounded" class="field-item column">
      <div class="label">舍入情况：</div>
      <div class="value">
        <table class="rounded-table">
          <tbody>
            <tr>
              <td
                v-for="(item, index) of result.rounded.a"
                :key="index"
                :class="[{ active: item != result.rounded.result[index] }]"
              >
                {{ item }}
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) of result.rounded.b" :key="index">
                {{ item }}
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) of result.rounded.carry" :key="index" :class="[{ active2: item == 1 }]">
                {{ item || '' }}
              </td>
            </tr>
            <tr>
              <td
                v-for="(item, index) of result.rounded.result"
                :key="index"
                :class="[{ active: item != result.rounded.a[index] }]"
              >
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field-item:not(.column) {
  display: flex;
  .label {
    width: var(--labelWidth);
    text-align: right;
  }
  .span1 {
    background-color: rgba(101, 117, 133, 0.16);
    padding: 0 4px;
    border-radius: 4px;
    margin-right: 8px;
  }
}
.rounded-table {
  td.active {
    color: #a8b1ff;
    font-weight: 500;
  }
  td.active2 {
    color: #8a5402;
    font-weight: 500;
  }
}
</style>
