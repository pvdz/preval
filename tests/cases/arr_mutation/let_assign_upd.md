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


## Settled


`````js filename=intro
const tmpClusterSSA_arr /*:array*/ /*truthy*/ = [1];
$(tmpClusterSSA_arr);
const tmpBinLhs$1 /*:primitive*/ = tmpClusterSSA_arr[0];
const tmpIfTest /*:boolean*/ = tmpBinLhs$1 < 10;
if (tmpIfTest) {
  let arr /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    arr = [1];
    $(arr);
    const tmpBinLhs$2 /*:unknown*/ = arr[0];
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$2 < 10;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(arr);
} else {
  $(tmpClusterSSA_arr);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_arr = [1];
$(tmpClusterSSA_arr);
if (tmpClusterSSA_arr[0] < 10) {
  let arr = undefined;
  while (true) {
    arr = [1];
    $(arr);
    if (!(arr[0] < 10)) {
      break;
    }
  }
  $(arr);
} else {
  $(tmpClusterSSA_arr);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
const b = a[ 0 ];
const c = b < 10;
if (c) {
  let d = undefined;
  while ($LOOP_UNROLL_10) {
    d = [ 1 ];
    $( d );
    const e = d[ 0 ];
    const f = e < 10;
    if (f) {

    }
    else {
      break;
    }
  }
  $( d );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
