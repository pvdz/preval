# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Neg infinity > Implicit x op nan
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  x ** -Infinity,
  x * -Infinity,
  x / -Infinity,
  x % -Infinity,
  x + -Infinity,
  x - -Infinity,
  x << -Infinity,
  x >> -Infinity,
  x >>> -Infinity,
  x < -Infinity,
  x > -Infinity,
  x <= -Infinity,
  x >= -Infinity,
  x == -Infinity,
  x != -Infinity,
  x === -Infinity,
  x !== -Infinity,
  x & -Infinity,
  x ^ -Infinity,
  x | -Infinity,
];
$(arr);

const arr2 = [
  x in -Infinity,
  x instanceof -Infinity,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const arr = [
  x ** -Infinity,
  x * -Infinity,
  x / -Infinity,
  x % -Infinity,
  x + -Infinity,
  x - -Infinity,
  x << -Infinity,
  x >> -Infinity,
  x >>> -Infinity,
  x < -Infinity,
  x > -Infinity,
  x <= -Infinity,
  x >= -Infinity,
  x == -Infinity,
  x != -Infinity,
  x === -Infinity,
  x !== -Infinity,
  x & -Infinity,
  x ^ -Infinity,
  x | -Infinity,
];
$(arr);
const arr2 = [x in -Infinity, x instanceof -Infinity];
$(arr2);
`````

## Normalized

`````js filename=intro
const tmpArrElement = x ** -Infinity;
const tmpArrElement$1 = x * -Infinity;
const tmpArrElement$3 = x / -Infinity;
const tmpArrElement$5 = x % -Infinity;
const tmpArrElement$7 = x + -Infinity;
const tmpArrElement$9 = x - -Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < -Infinity;
const tmpArrElement$19 = x > -Infinity;
const tmpArrElement$21 = x <= -Infinity;
const tmpArrElement$23 = x >= -Infinity;
const tmpArrElement$25 = x == -Infinity;
const tmpArrElement$27 = x != -Infinity;
const tmpArrElement$29 = x === -Infinity;
const tmpArrElement$31 = x !== -Infinity;
const tmpArrElement$33 = x & 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in -Infinity;
const tmpArrElement$41 = x instanceof -Infinity;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const tmpArrElement = x ** -Infinity;
const tmpArrElement$1 = x * -Infinity;
const tmpArrElement$3 = x / -Infinity;
const tmpArrElement$5 = x % -Infinity;
const tmpArrElement$7 = x + -Infinity;
const tmpArrElement$9 = x - -Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < -Infinity;
const tmpArrElement$19 = x > -Infinity;
const tmpArrElement$21 = x <= -Infinity;
const tmpArrElement$23 = x >= -Infinity;
const tmpArrElement$25 = x == -Infinity;
const tmpArrElement$27 = x != -Infinity;
const tmpArrElement$29 = x === -Infinity;
const tmpArrElement$31 = x !== -Infinity;
const tmpArrElement$33 = x & 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in -Infinity;
const tmpArrElement$41 = x instanceof -Infinity;
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