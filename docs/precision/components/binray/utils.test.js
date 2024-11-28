import { test, assert, expect, it } from 'vitest';
import { decimalToBinary } from './utils';

test('decimalToBinary', () => {
  // var info = decimalToBinary(1.9999999999999998);
  // console.log('[zdz]:', info)
  // var info = decimalToBinary(0.1);
  // assert.equal(info.binary, '0.0001100110011001100110011001100110011001100110011001100110');
  // assert.equal(info.binary.length, 60);
  // assert.equal(info.index, 1019);
  // assert.equal(info.sign, '0');
  // assert.equal(info.exponent, '01111111011');
  // assert.equal(info.mantissa, '1001100110011001100110011001100110011001100110011010');
  // assert.equal(info.exponent.length, 11);
  // assert.equal(info.mantissa.length, 52);

  // var info = decimalToBinary(0.2);
  // assert.equal(info.binary, '0.001100110011001100110011001100110011001100110011001100110');
  // assert.equal(info.binary.length, 59);
  // assert.equal(info.index, 1020);
  // assert.equal(info.sign, '0');
  // assert.equal(info.exponent, '01111111100');
  // assert.equal(info.mantissa, '1001100110011001100110011001100110011001100110011010');
  // assert.equal(info.exponent.length, 11);
  // assert.equal(info.mantissa.length, 52);
});
