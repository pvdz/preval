# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > True > Nan op implicit x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  true ** x,
  true * x,
  true / x,
  true % x,
  true + x,
  true - x,
  true << x,
  true >> x,
  true >>> x,
  true < x,
  true > x,
  true <= x,
  true >= x,
  true == x,
  true != x,
  true === x,
  true !== x,
  true & x,
  true ^ x,
  true | x,
];
$(arr);

const arr2 = [
  true in x,
  true instanceof x,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const arr = [
  true ** x,
  true * x,
  true / x,
  true % x,
  true + x,
  true - x,
  true << x,
  true >> x,
  true >>> x,
  true < x,
  true > x,
  true <= x,
  true >= x,
  true == x,
  true != x,
  true === x,
  true !== x,
  true & x,
  true ^ x,
  true | x,
];
$(arr);
const arr2 = [true in x, true instanceof x];
$(arr2);
`````

## Normalized

`````js filename=intro
const tmpArrElement = 1 ** x;
const tmpArrElement$1 = 1 * x;
const tmpArrElement$3 = 1 / x;
const tmpArrElement$5 = 1 % x;
const tmpArrElement$7 = true + x;
const tmpArrElement$9 = 1 - x;
const tmpArrElement$11 = 1 << x;
const tmpArrElement$13 = 1 >> x;
const tmpArrElement$15 = 1 >>> x;
const tmpArrElement$17 = true < x;
const tmpArrElement$19 = true > x;
const tmpArrElement$21 = true <= x;
const tmpArrElement$23 = true >= x;
const tmpArrElement$25 = true == x;
const tmpArrElement$27 = true != x;
const tmpArrElement$29 = true === x;
const tmpArrElement$31 = true !== x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
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
const tmpArrElement$39 = true in x;
const tmpArrElement$41 = true instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const tmpArrElement = 1 ** x;
const tmpArrElement$1 = 1 * x;
const tmpArrElement$3 = 1 / x;
const tmpArrElement$5 = 1 % x;
const tmpArrElement$7 = true + x;
const tmpArrElement$9 = 1 - x;
const tmpArrElement$11 = 1 << x;
const tmpArrElement$13 = 1 >> x;
const tmpArrElement$15 = 1 >>> x;
const tmpArrElement$17 = true < x;
const tmpArrElement$19 = true > x;
const tmpArrElement$21 = true <= x;
const tmpArrElement$23 = true >= x;
const tmpArrElement$25 = true == x;
const tmpArrElement$27 = true != x;
const tmpArrElement$29 = true === x;
const tmpArrElement$31 = true !== x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
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
const tmpArrElement$39 = true in x;
const tmpArrElement$41 = true instanceof x;
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
