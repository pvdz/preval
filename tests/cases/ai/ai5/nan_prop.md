# Preval test case

# nan_prop.md

> Ai > Ai5 > Nan prop
>
> Test normalization of NaN property access

## Input

`````js filename=intro
const obj = { "NaN": 1 };
const x = obj[NaN];
$(x);

// Expected:
// const obj = { "NaN": 1 };
// const x = obj["NaN"];
// $(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { NaN: 1 };
const x = obj[NaN];
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
