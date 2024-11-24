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

    // 从0开始算
    // 进位规则：
    // 如果第51位为1 且 第52位和第53位至少有一个是1，则需要进位
    // 如果第51位为1 且 第52位和第53位都为0，第50位为1，则需要进位
    // 总结：如果第51位为1，第50、52和53位有一个是1，则需要进位
    if (decimal[51 + offset] === '1' && [50, 52, 53].find((i) => decimal[i + offset] === '1')) {
      rounded = binaryPlus(`${int}.${mantissa}`, `0.${''.padStart(51 + offset, '0')}1`);
      rounded.a += binary.slice(-2); // 这里加多2位 a要展示54位 方便查看进位情况
      [int, mantissa] = rounded.result.join('').split('.');
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

/**
 * 二进制加法运算
 * 0 + 0 = 0
 * 0 + 1 = 1
 * 1 + 0 = 1
 * 1 + 1 = 10 写0 进位1
 * 进位后如果是  1 + 1 + 1 = 11 写1 进位1
 */
export function binaryPlus(a, b) {
  const res = formatNumber(a, b);
  a = res.a
  b = res.b


  let carry = Array(a.length + 1);
  let result = Array(a.length + 1);
  let offset = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    const idx = i + 1;
    if (a[i] === '.') {
      carry[idx] = a[i];
      result[idx] = a[i];
      continue;
    }

    const n = Number(a[i]) + Number(b[i]) + offset;
    if (n > 1) {
      offset = 1;
      const index = a[i - 1] === '.' ? i - 1 : i;
      carry[index] = 1;
      i === 0 && (result[0] = 1);
    } else {
      offset = 0;
    }
    if (!carry[idx]) {
      carry[idx] = 0;
    }
    result[idx] = [1, 3].includes(n) ? 1 : 0;
  }
  if (!(0 in carry)) {
    carry.shift();
  }
  if (!(0 in result)) {
    result.shift();
  }
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
  res.a = a;
  res.b = b;
  res.result = result;
  res.carry = carry;
  return res;
}


export function binaryMinus(r1, r2) {
  // 2 - 3 = -1  3 - 2 = 1
  // -2 - 3 = -5 2 + 3 = -5
  // 2 - -3 = 5  2 + 3 = 5
  // -2 - (-3) = 1  3 - 2 = 1
  // -3 - (-2) = 1 3 - 2 = -1
  const res = formatNumber(a, b)
  a = res.a;
  b = res.b;

}

/**
 * 将a和b的长度对齐，前面补0或后面补0
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
  let dot = '';

  [aint, bint, astart, bstart] = format(aint, bint, 'padStart');

  if (adecimal || bdecimal) {
    dot = '.';
    [adecimal, bdecimal, aend, bend] = format(adecimal, bdecimal, 'padEnd');
  }
  a = aint + dot + adecimal;
  b = bint + dot + bdecimal;
  
  return { a, b, astart, bstart, aend, bend };
}
