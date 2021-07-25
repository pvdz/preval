# Preval test case

# nan_op_x_num.md

> Normalize > Binary > With > Null > Nan op x num
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const x = $spy(50);

const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);

const arr2 = [
  null in x,
  null instanceof x,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const x = $spy(50);
const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);
const arr2 = [null in x, null instanceof x];
$(arr2);
`````

## Normalized

`````js filename=intro
const x = $spy(50);
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = null < x;
const tmpArrElement$19 = null > x;
const tmpArrElement$21 = null <= x;
const tmpArrElement$23 = null >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = null in x;
const tmpArrElement$41 = null instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const x = $spy(50);
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = null < x;
const tmpArrElement$19 = null > x;
const tmpArrElement$21 = null <= x;
const tmpArrElement$23 = null >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = null in x;
const tmpArrElement$41 = null instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [50, 50]
 - 2: '$spy[1].valueOf()', 50
 - 3: '$spy[1].valueOf()', 50
 - 4: '$spy[1].valueOf()', 50
 - 5: '$spy[1].valueOf()', 50
 - 6: '$spy[1].valueOf()', 50
 - 7: '$spy[1].valueOf()', 50
 - 8: '$spy[1].valueOf()', 50
 - 9: '$spy[1].valueOf()', 50
 - 10: '$spy[1].valueOf()', 50
 - 11: '$spy[1].valueOf()', 50
 - 12: '$spy[1].valueOf()', 50
 - 13: '$spy[1].valueOf()', 50
 - 14: '$spy[1].valueOf()', 50
 - 15: '$spy[1].valueOf()', 50
 - 16: '$spy[1].valueOf()', 50
 - 17: '$spy[1].valueOf()', 50
 - 18: [0, 0, 0, 0, 50, -50, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 50, 50]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
