import { binaryToDecimal } from './docs/zdz/components/binray/utils.js'
import NP from 'number-precision'
const r = binaryToDecimal('1.1111111111111111111111111111111111111111111111111111')
// 1.9999999999999998
console.log('[zdz]:', r)
// const r = NP.times(2, 2)
// console.log('[zdz]:', r)