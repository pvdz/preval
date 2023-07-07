# Preval test case

# let_assign_upd.md

> Arr mutation > Let assign upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
let arr;
do {
  arr = [0];
  arr[0] = arr[0] + 1;
  $(arr);
} while (arr[0] < 10);
$(arr);
`````

## Pre Normal

`````js filename=intro
let arr;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      arr = [0];
      arr[0] = arr[0] + 1;
      $(arr);
    }
    tmpDoWhileFlag = arr[0] < 10;
  }
}
$(arr);
`````

## Normalized

`````js filename=intro
let arr = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  arr = [0];
  const tmpAssignComputedObj = arr;
  const tmpAssignComputedProp = 0;
  const tmpBinLhs = arr[0];
  const tmpAssignComputedRhs = tmpBinLhs + 1;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(arr);
  const tmpBinLhs$1 = arr[0];
  tmpDoWhileFlag = tmpBinLhs$1 < 10;
}
$(arr);
`````

## Output

`````js filename=intro
let arr = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  arr = [0];
  const tmpAssignComputedObj = arr;
  const tmpBinLhs = arr[0];
  const tmpAssignComputedRhs = tmpBinLhs + 1;
  tmpAssignComputedObj[0] = tmpAssignComputedRhs;
  $(arr);
  const tmpBinLhs$1 = arr[0];
  tmpDoWhileFlag = tmpBinLhs$1 < 10;
}
$(arr);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - 2: [1]
 - 3: [1]
 - 4: [1]
 - 5: [1]
 - 6: [1]
 - 7: [1]
 - 8: [1]
 - 9: [1]
 - 10: [1]
 - 11: [1]
 - 12: [1]
 - 13: [1]
 - 14: [1]
 - 15: [1]
 - 16: [1]
 - 17: [1]
 - 18: [1]
 - 19: [1]
 - 20: [1]
 - 21: [1]
 - 22: [1]
 - 23: [1]
 - 24: [1]
 - 25: [1]
 - 26: [1]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
