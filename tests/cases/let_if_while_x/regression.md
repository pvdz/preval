# Preval test case

# regression.md

> Let if while x > Regression
>
> Uncovered a problem with SSA.
> The flag assignment got SSA'd, replacing the inner read but not the write

## Input

`````js filename=intro
let flag = false;
const t = $(5);
const x = 0 < t;
flag = x;
while (true) {
  if (flag) {
    $(`inner`);
    flag = false;
  } else {
    break;
  }
}
`````


## Settled


`````js filename=intro
const t /*:unknown*/ = $(5);
const flag /*:boolean*/ = 0 < t;
if (flag) {
  $(`inner`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const t = $(5);
if (0 < t) {
  $(`inner`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
const b = 0 < a;
if (b) {
  $( "inner" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let flag = false;
const t = $(5);
const x = 0 < t;
flag = x;
while (true) {
  if (flag) {
    $(`inner`);
    flag = false;
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
