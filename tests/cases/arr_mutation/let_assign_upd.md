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
while (true) {
  {
    arr = [0];
    arr[0] = arr[0] + 1;
    $(arr);
  }
  if (arr[0] < 10) {
  } else {
    break;
  }
}
$(arr);
`````

## Normalized


`````js filename=intro
let arr = undefined;
while (true) {
  arr = [0];
  const tmpAssignComputedObj = arr;
  const tmpAssignComputedProp = 0;
  const tmpBinLhs = arr[0];
  const tmpAssignComputedRhs = tmpBinLhs + 1;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(arr);
  const tmpBinLhs$1 = arr[0];
  const tmpIfTest = tmpBinLhs$1 < 10;
  if (tmpIfTest) {
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
const tmpIfTest = tmpBinLhs$1 < 10;
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    arr = [0];
    const tmpAssignComputedObj$1 = arr;
    const tmpBinLhs$2 = arr[0];
    const tmpAssignComputedRhs$1 = tmpBinLhs$2 + 1;
    tmpAssignComputedObj$1[0] = tmpAssignComputedRhs$1;
    $(arr);
    const tmpBinLhs$4 = arr[0];
    const tmpIfTest$1 = tmpBinLhs$4 < 10;
    if (tmpIfTest$1) {
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
let a = [ 0 ];
const b = a;
const c = a[ 0 ];
const d = c + 1;
b[0] = d;
$( a );
const e = a[ 0 ];
const f = e < 10;
if (f) {
  while ($LOOP_UNROLL_10) {
    a = [ 0 ];
    const g = a;
    const h = a[ 0 ];
    const i = h + 1;
    g[0] = i;
    $( a );
    const j = a[ 0 ];
    const k = j < 10;
    if (k) {

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
