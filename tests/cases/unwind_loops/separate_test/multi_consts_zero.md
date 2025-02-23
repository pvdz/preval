# Preval test case

# multi_consts_zero.md

> Unwind loops > Separate test > Multi consts zero
>
> Pump and dump

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
const max /*:unknown*/ = $(10);
const test /*:boolean*/ = 2 < max;
const arr1 /*:array*/ = [];
if (test) {
  arr1[-2] = 101;
  let tmpClusterSSA_counter /*:number*/ = 1;
  let tmpClusterSSA_test /*:boolean*/ = 1 < max;
  const arr2 /*:array*/ = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_test) {
      const x$1 /*:number*/ = tmpClusterSSA_counter - 2;
      const y$1 /*:unknown*/ = arr2[tmpClusterSSA_counter];
      arr1[x$1] = y$1;
      tmpClusterSSA_counter = tmpClusterSSA_counter + 1;
      tmpClusterSSA_test = tmpClusterSSA_counter < max;
    } else {
      break;
    }
  }
} else {
}
$(arr1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = 2 < a;
const c = [];
if (b) {
  c[-2] = 101;
  let d = 1;
  let e = 1 < a;
  const f = [ 101, 102, 103, 104, 105, 106, 107, 108, 109, 1010 ];
  while ($LOOP_UNROLL_10) {
    if (e) {
      const g = d - 2;
      const h = f[ d ];
      c[g] = h;
      d = d + 1;
      e = d < a;
    }
    else {
      break;
    }
  }
}
$( c );
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
