import NP from 'number-precision';

/**
 * 二转十
 */
export function binaryToDecimal(binaryString) {
  let decimalValue = 0;
  let [int, decimal] = binaryString.split('.');

  // 处理整数部分
  if (int) {
    decimalValue += parseInt(int, 2);
  }

  // 处理小数部分
  if (decimal) {
    for (let i = 0; i < decimal.length; i++) {
      const index = -(i + 1);
      if (decimal[i] === '1') {
        const val = Math.pow(2, index);
        decimalValue += val;
      }
    }
  }

  return decimalValue;
}

/**
 * 十转二
 */
export function decimalToBinary(num) {
  const binary = Number.isInteger(num) ? num.toString(2) : doDecimalToBinary(num);
  return floatToParts(num, binary);
}

function doDecimalToBinary(num, maxPrecision = 100) {
  // 判断是否为负数
  let isNegative = num < 0;
  if (isNegative) {
    num = -num; // 转换为正数进行处理
  }

  // 处理整数部分
  let integerPart = Math.floor(num);
  let binaryInteger = '';
  do {
    binaryInteger = (integerPart % 2) + binaryInteger;
    integerPart = Math.floor(integerPart / 2);
  } while (integerPart > 0);

  // 处理小数部分
  let fractionalPart = num - Math.floor(num);
  let binaryFractional = '';
  for (let i = 0; i < maxPrecision && fractionalPart > 0; i++) {
    // 这里要用不损失精度的js库，不然会计算错误
    // 例如：0.1 用toFixed(1) 倒是可以解决
    //     但是如果num为1.9999999999999998
    //     使用toFixed(1)又会有问题
    fractionalPart = NP.times(fractionalPart, 2); // fractionalPart *= 2
    let bit = Math.floor(fractionalPart);
    binaryFractional += bit;
    fractionalPart = NP.minus(fractionalPart, bit); // fractionalPart - bit
    // console.log('[后]:', zdz, fractionalPart)
  }

  // 组合整数和小数部分
  let result = binaryInteger + (binaryFractional ? '.' + binaryFractional : '');

  // 如果是负数，添加负号
  if (isNegative) {
    result = '-' + result;
  }
  return result;
}

function floatToParts(num, binary) {
  const [integer, decimal = ''] = binary.split('.');
  let int = integer;
  let mantissa;
  let index;
  let rounded;

  // 符号位（1）
  let sign = '0';
  if (num === 0 && !Object.is(0, num)) {
    // 是-0
    sign = '1';
    binary = '-0';
    index = -1023;
  } else if (int[0] === '-') {
    sign = '1';
    int = int.slice(1);
  }

  // 尾数位（52）
  if (decimal.length > 52) {
    const offset = int === '0' ? decimal.indexOf('1') + 1 : 0;
    mantissa = decimal.slice(0, 52 + offset);
    binary = `${integer}.${decimal.slice(0, 54 + offset)}`;

    // 从0开始算 "向最近的偶数位舍入"
    // 进位规则：
    // 如果第51位为1 且 第52位和第53位至少有一个是1，则需要进位
    // 如果第51位为1 且 第52位和第53位都为0，第50位为1，则需要进位
    // 总结：如果第51位为1，第50、52和53位有一个是1，则需要进位
    // [50, 52, 53]
    // if (decimal[51 + offset] === '1' && [52, 53].find((i) => decimal[i + offset] === '1')) {
    if (decimal[52 + offset] === '1') {
      rounded = doBinaryPlus(`${int}.${mantissa}`, `0.${''.padStart(51 + offset, '0')}1`);
      rounded.a += binary.slice(-2); // 这里加多2位 a要展示54位 方便查看进位情况
      [int, mantissa] = rounded.result.split('.');
    }
  } else {
    mantissa = decimal.padEnd(52, '0');
  }
  const actualBinary = `${int}.${mantissa}`;

  // 指数位（11）
  if ([1, -1].includes(num)) {
    index = 0;
  } else if (int === '0') {
    index = mantissa.indexOf('1') + 1;
    mantissa = mantissa.slice(index);
    index = -index;
  } else {
    index = int.length - 1;
  }
  const actualIndex = index + 1023;
  const exponent = actualIndex.toString(2).padStart(11, '0');
  if (actualIndex === 0) {
    index = 0;
  }

  return {
    num,
    binary,
    actualBinary,
    rounded,
    index,
    actualIndex,
    sign,
    exponent,
    mantissa
  };
}

export function binaryPlus(n1, n2) {
  return operation(n1, n2, true);
}

export function binaryMinus(n1, n2) {
  return operation(n1, n2, false);
}

export function operation(n1, n2, plus) {
  let num1 = decimalToBinary(n1);
  let num2 = decimalToBinary(n2);
  const sameType = (n1 < 0 && n2 < 0) || (n1 > 0 && n2 > 0); // 两边是一样的 如：3+2  -3-(-2)
  const abs1 = Math.abs(n1);
  const abs2 = Math.abs(n2);

  const sign = (plus ? n1 + n2 : n1 - n2) < 0 ? '-' : ''; // 减数 大于 被减数结果必是负数
  const yes = plus ? !sameType : sameType;

  const handler = yes ? doBinaryMinus : doBinaryPlus;

  if (yes && abs1 < abs2) {
    // 加法 -1+2 -2+1
    // 减法 -2-(-3) 2-3
    // 如上表达式都需要转换成减法，即大数减小数
    // 所以需将num1和num2调换过来
    [num1, num2] = [num2, num1];
  }

  const res = handler(num1.actualBinary, num2.actualBinary);
  // n1 = num1.num;
  // n2 = num2.num;
  if (plus) {
    res.expression = `${n1} + ${n2} = ${n1 + n2}`
  } else {
    res.expression = `${n1} - ${n2} = ${n1 - n2}`
  }
  res.num1 = num1;
  res.num2 = num2;
  res.value = sign + binaryToDecimal(res.result);
  res.minus = yes;
  return res;
}

/**
 * 二进制加法运算
 * 0 + 0 = 0
 * 0 + 1 = 1
 * 1 + 0 = 1
 * 1 + 1 = 10 写0 进位1
 * 进位后如果是  1 + 1 + 1 = 11 写1 进位1
 */
function doBinaryPlus(a, b) {
  const res = formatNumber(a, b);
  a = res.a;
  b = res.b;

  let carry = Array(a.length + 1).fill(0);
  let result = Array(a.length + 1).fill(0);
  let borrow = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    const n = Number(a[i]) + Number(b[i]) + borrow;
    if (n > 1) {
      borrow = 1;
      carry[i] = 1;
      i === 0 && (result[0] = 1);
    } else {
      borrow = 0;
    }
    if ([1, 3].includes(n)) {
      result[i + 1] = 1;
    }
  }
  if (result[0] === 0) {
    carry.shift();
    result.shift();
  }
  carry = carry.join('');
  result = result.join('');
  if (result.length > a.length) {
    //    1.111
    // +  0.001
    // = 10.000
    // 进位了, 需要在前面补0，方便展示
    a = a.padStart(result.length, '0');
    b = b.padStart(result.length, '0');
    res.astart += result.length - a.length;
    res.bstart += result.length - a.length;
  }
  const len = res.decimalLength;
  res.a = shouldInsertDot(a, len);
  res.b = shouldInsertDot(b, len);
  res.result = shouldInsertDot(result, len);
  res.carry = shouldInsertDot(carry, len);
  return res;
}

/**
 * 0 - 0 = 0：从0中减去0结果还是0
 * 1 - 0 = 1：从1中减去0结果是1
 * 1 - 1 = 0：从1中减去1结果是0
 * 0 - 1 = 1 (借位)：从0中减去1不能直接完成，
 * 因此需要向高位借1，借位后0变成10（即十进制的2），
 * 然后用10减去1得到1。同时，由于借了位，高位的值会相应减少。
 */
function doBinaryMinus(a, b) {
  const res = formatNumber(a, b);
  a = res.a;
  b = res.b;
  let borrows = new Array(a.length).fill(0);
  let borroweds = a.split('').map(n => Number(n));
  let result = '';
  let n1, n2;

  for (let i = borroweds.length - 1; i >= 0; i--) {
    n1 = borroweds[i];
    n2 = Number(b[i]);
    
    if (n1 < n2) {
      n1 += 2;
      borrows[i] = 2;
      borroweds[i - 1] -= 1;
    }
    result = (n1 - n2) + result;
  }
  const len = res.decimalLength;
  res.a = shouldInsertDot(a, len);
  res.b = shouldInsertDot(b, len);
  res.result = shouldInsertDot(result, len);
  res.borrows = shouldInsertDot(borrows, len);
  res.borroweds = shouldInsertDot(borroweds, len);
  return res;
}

/**
 * 将a和b的整数和小数位对齐，前面补0或后面补0
 * 例如:
 *  a = 1.111
 *  b = 11.11
 *  补0后
 *  a = 01.111
 *  b = 11.110
 */
function formatNumber(a, b) {
  const format = (c, d, fnName) => {
    const len = Math.max(c.length, d.length);
    const zero = Math.abs(c.length - d.length);
    let czero = 0;
    let dzero = 0;
    c.length > d.length ? (dzero = zero) : (czero = zero);
    c = c[fnName](len, '0');
    d = d[fnName](len, '0');
    return [c, d, czero, dzero];
  };

  let [aint, adecimal = ''] = a.split('.');
  let [bint, bdecimal = ''] = b.split('.');
  let astart = 0;
  let bstart = 0;
  let aend = 0;
  let bend = 0;

  [aint, bint, astart, bstart] = format(aint, bint, 'padStart');

  if (adecimal || bdecimal) {
    [adecimal, bdecimal, aend, bend] = format(adecimal, bdecimal, 'padEnd');
  }
  a = aint + adecimal;
  b = bint + bdecimal;

  const decimalLength = adecimal.length;

  return { a, b, decimalLength, astart, bstart, aend, bend };
}

function shouldInsertDot(str, len) {
  return !len ? str : str.slice(0, -len).concat('.').concat(str.slice(-len));
}
