# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > False > Nan op implicit x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);

const arr2 = [
  false in x,
  false instanceof x,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const arr = [
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);
const arr2 = [false in x, false instanceof x];
$(arr2);
`````

## Normalized

`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = false + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = false < x;
const tmpArrElement$19 = false > x;
const tmpArrElement$21 = false <= x;
const tmpArrElement$23 = false >= x;
const tmpArrElement$25 = false == x;
const tmpArrElement$27 = false != x;
const tmpArrElement$29 = false === x;
const tmpArrElement$31 = false !== x;
const tmpArrElement$33 = 0 & x;
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
const tmpArrElement$39 = false in x;
const tmpArrElement$41 = false instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = false + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = false < x;
const tmpArrElement$19 = false > x;
const tmpArrElement$21 = false <= x;
const tmpArrElement$23 = false >= x;
const tmpArrElement$25 = false == x;
const tmpArrElement$27 = false != x;
const tmpArrElement$29 = false === x;
const tmpArrElement$31 = false !== x;
const tmpArrElement$33 = 0 & x;
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
const tmpArrElement$39 = false in x;
const tmpArrElement$41 = false instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
