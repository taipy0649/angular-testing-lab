import { divide } from './divide';

describe('divide', () => {
  it('2つの数値を割り算する', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('負数と小数を扱える', () => {
    expect(divide(-3, 2)).toBe(-1.5);
  });

  it('0で割るとRangeErrorを投げる', () => {
    expect(() => divide(10, 0)).toThrowError(RangeError);
    expect(() => divide(10, 0)).toThrowError('Cannot divide by zero.');
  });
});
