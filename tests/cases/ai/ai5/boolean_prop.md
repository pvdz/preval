# Preval test case

# boolean_prop.md

> Ai > Ai5 > Boolean prop
>
> Test normalization of boolean property access

## Input

`````js filename=intro
const obj = { "true": 1, "false": 2 };
const x = obj[true];
const y = obj[false];
$(x + y);

// Expected:
// const obj = { "true": 1, "false": 2 };
// const x = obj["true"];
// const y = obj["false"];
// $(x + y);
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { true: 1, false: 2 };
const x = obj.true;
const y = obj.false;
let tmpCalleeParam = x + y;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
