# Preval test case

# base.md

> Free > Free loops > Base
>
>

## Input

`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  arr.push(counter);
  counter = counter + 1;
  const test = counter > 20;
  if (test) {
    break;
  } else {
  }
}
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpMCF = arr.push;
  $dotCall(tmpMCF, arr, `push`, counter);
  counter = counter + 1;
  const test = counter > 20;
  if (test) {
    break;
  } else {
  }
}
$(arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
