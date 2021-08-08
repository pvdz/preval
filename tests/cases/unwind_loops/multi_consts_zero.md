# Preval test case

# multi_consts_zero.md

> Unwind loops > Multi consts zero
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
while (test) {
  const x = counter - 2;
  const y = arr2[counter];
  arr1[x] = y;
  counter = counter + 1;
  test = counter < max;
}
$(arr1);
`````

## Output

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
