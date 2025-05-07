# Preval test case

# multi_consts.md

> Unwind loops > Separate test > Multi consts
>
> Pump and dump

## Input

`````js filename=intro
const arr1 = [];
const arr2 = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
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


## Settled


`````js filename=intro
const max /*:unknown*/ = $(10);
const test /*:boolean*/ = 2 < max;
const arr1 /*:array*/ = [];
if (test) {
  arr1[0] = 103;
  let tmpClusterSSA_counter /*:number*/ = 3;
  let tmpClusterSSA_test /*:boolean*/ = 3 < max;
  const arr2 /*:array*/ = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_test) {
      const x$1 /*:number*/ = tmpClusterSSA_counter - 2;
      const y$1 /*:primitive*/ = arr2[tmpClusterSSA_counter];
      arr1[x$1] = y$1;
      tmpClusterSSA_counter = tmpClusterSSA_counter + 1;
      tmpClusterSSA_test = tmpClusterSSA_counter < max;
    } else {
      break;
    }
  }
  $(arr1);
} else {
  $(arr1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const max = $(10);
const test = 2 < max;
const arr1 = [];
if (test) {
  arr1[0] = 103;
  let tmpClusterSSA_counter = 3;
  let tmpClusterSSA_test = 3 < max;
  const arr2 = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
  while (true) {
    if (tmpClusterSSA_test) {
      const x$1 = tmpClusterSSA_counter - 2;
      const y$1 = arr2[tmpClusterSSA_counter];
      arr1[x$1] = y$1;
      tmpClusterSSA_counter = tmpClusterSSA_counter + 1;
      tmpClusterSSA_test = tmpClusterSSA_counter < max;
    } else {
      break;
    }
  }
  $(arr1);
} else {
  $(arr1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = 2 < a;
const c = [];
if (b) {
  c[0] = 103;
  let d = 3;
  let e = 3 < a;
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
  $( c );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) support array reads statement type WhileStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: [103, 104, 105, 106, 107, 108, 109, 1010]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
