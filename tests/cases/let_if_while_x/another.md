# Preval test case

# another.md

> Let if while x > Another
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
let loopTest = $LOOP_UNROLL_10;
$(100);
const B = $(b);
const X = $(`x`);
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
} else {
  loopTest = false;
}
while (loopTest) {
  $(100);
  const B = $(b);
  const X = $(`x`);
  const C = $(c);
  const Y = $(`y`);
  const T = $(3);
  C[Y] = T;
  B[X] = T;
  if (T) {
  } else {
    break;
  }
}
$(a, b, c, 3);
`````

## Pre Normal

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
let loopTest = $LOOP_UNROLL_10;
$(100);
const B = $(b);
const X = $(`x`);
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
} else {
  loopTest = false;
}
while (loopTest) {
  $(100);
  const B$1 = $(b);
  const X$1 = $(`x`);
  const C = $(c);
  const Y$1 = $(`y`);
  const T = $(3);
  C[Y$1] = T;
  B$1[X$1] = T;
  if (T) {
  } else {
    break;
  }
}
$(a, b, c, 3);
`````

## Normalized

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
let loopTest = $LOOP_UNROLL_10;
$(100);
const B = $(b);
const X = $(`x`);
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
} else {
  loopTest = false;
}
while (loopTest) {
  $(100);
  const B$1 = $(b);
  const X$1 = $(`x`);
  const C = $(c);
  const Y$1 = $(`y`);
  const T = $(3);
  C[Y$1] = T;
  B$1[X$1] = T;
  if (T) {
  } else {
    break;
  }
}
$(a, b, c, 3);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
let loopTest = $LOOP_UNROLL_10;
$(100);
const B = $(b);
const X = $(`x`);
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
} else {
  loopTest = false;
}
while (loopTest) {
  $(100);
  const B$1 = $(b);
  const X$1 = $(`x`);
  const C = $(c);
  const Y$1 = $(`y`);
  const T = $(3);
  C[Y$1] = T;
  B$1[X$1] = T;
  if (T) {
  } else {
    break;
  }
}
$(a, b, c, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - 7: 100
 - 8: { x: '3' }
 - 9: 'x'
 - 10: { y: '3' }
 - 11: 'y'
 - 12: 3
 - 13: 100
 - 14: { x: '3' }
 - 15: 'x'
 - 16: { y: '3' }
 - 17: 'y'
 - 18: 3
 - 19: 100
 - 20: { x: '3' }
 - 21: 'x'
 - 22: { y: '3' }
 - 23: 'y'
 - 24: 3
 - 25: 100
 - 26: { x: '3' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
