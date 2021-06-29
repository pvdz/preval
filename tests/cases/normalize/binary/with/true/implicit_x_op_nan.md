# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > True > Implicit x op nan
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  x ** true,
  x * true,
  x / true,
  x % true,
  x + true,
  x - true,
  x << true,
  x >> true,
  x >>> true,
  x < true,
  x > true,
  x <= true,
  x >= true,
  x == true,
  x != true,
  x === true,
  x !== true,
  x & true,
  x ^ true,
  x | true,
];
$(arr);

const arr2 = [
  x in true,
  x instanceof true,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const arr = [
  x ** true,
  x * true,
  x / true,
  x % true,
  x + true,
  x - true,
  x << true,
  x >> true,
  x >>> true,
  x < true,
  x > true,
  x <= true,
  x >= true,
  x == true,
  x != true,
  x === true,
  x !== true,
  x & true,
  x ^ true,
  x | true,
];
$(arr);
const arr2 = [x in true, x instanceof true];
$(arr2);
`````

## Normalized

`````js filename=intro
const tmpArrElement = x ** 1;
const tmpArrElement$1 = x * 1;
const tmpArrElement$3 = x / 1;
const tmpArrElement$5 = x % 1;
const tmpArrElement$7 = x + true;
const tmpArrElement$9 = x - 1;
const tmpArrElement$11 = x << 1;
const tmpArrElement$13 = x >> 1;
const tmpArrElement$15 = x >>> 1;
const tmpArrElement$17 = x < true;
const tmpArrElement$19 = x > true;
const tmpArrElement$21 = x <= true;
const tmpArrElement$23 = x >= true;
const tmpArrElement$25 = x == true;
const tmpArrElement$27 = x != true;
const tmpArrElement$29 = x === true;
const tmpArrElement$31 = x !== true;
const tmpArrElement$33 = x & 1;
const tmpArrElement$35 = x ^ 1;
const tmpArrElement$37 = x | 1;
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
const tmpArrElement$39 = x in true;
const tmpArrElement$41 = x instanceof true;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const tmpArrElement = x ** 1;
const tmpArrElement$1 = x * 1;
const tmpArrElement$3 = x / 1;
const tmpArrElement$5 = x % 1;
const tmpArrElement$7 = x + true;
const tmpArrElement$9 = x - 1;
const tmpArrElement$11 = x << 1;
const tmpArrElement$13 = x >> 1;
const tmpArrElement$15 = x >>> 1;
const tmpArrElement$17 = x < true;
const tmpArrElement$19 = x > true;
const tmpArrElement$21 = x <= true;
const tmpArrElement$23 = x >= true;
const tmpArrElement$25 = x == true;
const tmpArrElement$27 = x != true;
const tmpArrElement$29 = x === true;
const tmpArrElement$31 = x !== true;
const tmpArrElement$33 = x & 1;
const tmpArrElement$35 = x ^ 1;
const tmpArrElement$37 = x | 1;
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
const tmpArrElement$39 = x in true;
const tmpArrElement$41 = x instanceof true;
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
