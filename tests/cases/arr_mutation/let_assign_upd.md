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
while (true) {
  if (tmpDoWhileFlag) {
    arr = [0];
    const tmpAssignComputedObj = arr;
    const tmpAssignComputedProp = 0;
    const tmpBinLhs = arr[0];
    const tmpAssignComputedRhs = tmpBinLhs + 1;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    $(arr);
    const tmpBinLhs$1 = arr[0];
    tmpDoWhileFlag = tmpBinLhs$1 < 10;
  } else {
    break;
  }
}
$(arr);
`````

## Output

`````js filename=intro
let arr = [0];
const tmpAssignComputedObj = arr;
const tmpBinLhs = arr[0];
const tmpAssignComputedRhs = tmpBinLhs + 1;
tmpAssignComputedObj[0] = tmpAssignComputedRhs;
$(arr);
const tmpBinLhs$1 = arr[0];
let tmpClusterSSA_tmpDoWhileFlag = tmpBinLhs$1 < 10;
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  arr = [0];
  const tmpAssignComputedObj$1 = arr;
  const tmpBinLhs$2 = arr[0];
  const tmpAssignComputedRhs$1 = tmpBinLhs$2 + 1;
  tmpAssignComputedObj$1[0] = tmpAssignComputedRhs$1;
  $(arr);
  const tmpBinLhs$4 = arr[0];
  tmpClusterSSA_tmpDoWhileFlag = tmpBinLhs$4 < 10;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      arr = [0];
      const tmpAssignComputedObj$2 = arr;
      const tmpBinLhs$3 = arr[0];
      const tmpAssignComputedRhs$2 = tmpBinLhs$3 + 1;
      tmpAssignComputedObj$2[0] = tmpAssignComputedRhs$2;
      $(arr);
      const tmpBinLhs$5 = arr[0];
      tmpClusterSSA_tmpDoWhileFlag = tmpBinLhs$5 < 10;
    } else {
      break;
    }
  }
} else {
}
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
let a = [ 0,, ];
const b = a;
const c = a[ 0 ];
const d = c + 1;
b[0] = d;
$( a );
const e = a[ 0 ];
let f = e < 10;
let g = true;
if (f) {
  a = [ 0,, ];
  const h = a;
  const i = a[ 0 ];
  const j = i + 1;
  h[0] = j;
  $( a );
  const k = a[ 0 ];
  f = k < 10;
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (f) {
      a = [ 0,, ];
      const l = a;
      const m = a[ 0 ];
      const n = m + 1;
      l[0] = n;
      $( a );
      const o = a[ 0 ];
      f = o < 10;
    }
    else {
      break;
    }
  }
}
$( a );
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
