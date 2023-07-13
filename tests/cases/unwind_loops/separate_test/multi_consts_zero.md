# Preval test case

# multi_consts_zero.md

> Unwind loops > Separate test > Multi consts zero
>
> Pump and dump

#TODO

## Input

`````js filename=intro
const arr1 = [];
const arr2 = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 0;
let test = 2 < max;
while (test) {
  const x = counter - 2;
  const y = arr2[counter];
  arr1[x] = y;
  counter = counter + 1;
  test = counter < max;
}
$(arr1);
`````

## Pre Normal

`````js filename=intro
const arr1 = [];
const arr2 = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 0;
let test = 2 < max;
while (test) {
  const x = counter - 2;
  const y = arr2[counter];
  arr1[x] = y;
  counter = counter + 1;
  test = counter < max;
}
$(arr1);
`````

## Normalized

`````js filename=intro
const arr1 = [];
const arr2 = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 0;
let test = 2 < max;
while (true) {
  if (test) {
    const x = counter - 2;
    const y = arr2[counter];
    arr1[x] = y;
    counter = counter + 1;
    test = counter < max;
  } else {
    break;
  }
}
$(arr1);
`````

## Output

`````js filename=intro
const max = $(10);
let counter = 0;
let test = 2 < max;
let $tmpLoopUnrollCheck = true;
const arr1 = [];
if (test) {
  arr1[-2] = 101;
  counter = 1;
  test = 1 < max;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  const arr2 = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
  while ($LOOP_UNROLL_10) {
    if (test) {
      const x$1 = counter - 2;
      const y$1 = arr2[counter];
      arr1[x$1] = y$1;
      counter = counter + 1;
      test = counter < max;
    } else {
      break;
    }
  }
} else {
}
$(arr1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: [103, 104, 105, 106, 107, 108, 109, 1010]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
