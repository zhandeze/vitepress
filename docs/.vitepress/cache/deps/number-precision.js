// node_modules/.pnpm/number-precision@1.6.0/node_modules/number-precision/build/index.es.js
function strip(num, precision) {
  if (precision === void 0) {
    precision = 15;
  }
  return +parseFloat(Number(num).toPrecision(precision));
}
function digitLength(num) {
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
function float2Fixed(num) {
  if (num.toString().indexOf("e") === -1) {
    return Number(num.toString().replace(".", ""));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
    }
  }
}
function createOperation(operation) {
  return function() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      nums[_i] = arguments[_i];
    }
    var first = nums[0], others = nums.slice(1);
    return others.reduce(function(prev, next) {
      return operation(prev, next);
    }, first);
  };
}
var times = createOperation(function(num1, num2) {
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
});
var plus = createOperation(function(num1, num2) {
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
});
var minus = createOperation(function(num1, num2) {
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
});
var divide = createOperation(function(num1, num2) {
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
});
function round(num, decimal) {
  var base = Math.pow(10, decimal);
  var result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  return result;
}
var _boundaryCheckingState = true;
function enableBoundaryChecking(flag) {
  if (flag === void 0) {
    flag = true;
  }
  _boundaryCheckingState = flag;
}
var index = {
  strip,
  plus,
  minus,
  times,
  divide,
  round,
  digitLength,
  float2Fixed,
  enableBoundaryChecking
};
var index_es_default = index;
export {
  index_es_default as default,
  digitLength,
  divide,
  enableBoundaryChecking,
  float2Fixed,
  minus,
  plus,
  round,
  strip,
  times
};
//# sourceMappingURL=number-precision.js.map
