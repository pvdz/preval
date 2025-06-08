# Preval test case

# do_block_test.md

> Normalize > Pattern > Assignment > Do block test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = [10, 20], x = 3, y = 4, p, q;
do { [p, q] = $(b); } while (x + y);
$(p, q);
`````


## Settled


`````js filename=intro
const b /*:array*/ /*truthy*/ = [10, 20];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpArrAssignPatternRhs /*:unknown*/ = $(b);
  [...tmpArrAssignPatternRhs];
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = [10, 20];
while (true) {
  const tmpArrAssignPatternRhs = $(b);
  [...tmpArrAssignPatternRhs];
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( a );
  [ ...b ];
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = [10, 20];
let x = 3;
let y = 4;
let p = undefined;
let q = undefined;
while (true) {
  const tmpArrAssignPatternRhs = $(b);
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  p = tmpArrPatternSplat[0];
  q = tmpArrPatternSplat[1];
  const tmpIfTest = x + y;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(p, q);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type WhileStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [10, 20]
 - 2: [10, 20]
 - 3: [10, 20]
 - 4: [10, 20]
 - 5: [10, 20]
 - 6: [10, 20]
 - 7: [10, 20]
 - 8: [10, 20]
 - 9: [10, 20]
 - 10: [10, 20]
 - 11: [10, 20]
 - 12: [10, 20]
 - 13: [10, 20]
 - 14: [10, 20]
 - 15: [10, 20]
 - 16: [10, 20]
 - 17: [10, 20]
 - 18: [10, 20]
 - 19: [10, 20]
 - 20: [10, 20]
 - 21: [10, 20]
 - 22: [10, 20]
 - 23: [10, 20]
 - 24: [10, 20]
 - 25: [10, 20]
 - 26: [10, 20]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
