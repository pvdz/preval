# Preval test case

# logical_op_normalize.md

> Ai > Ai5 > Logical op normalize
>
> Test normalization of logical operations to ternary

## Input

`````js filename=intro
const x = 1;
const y = 2;
const z = x && y;
$(z);

// Expected:
// const x = 1;
// const y = 2;
// const z = x ? y : x;
// $(z);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 1;
const y = 2;
let z = x;
if (z) {
  z = y;
  $(y);
} else {
  $(z);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
