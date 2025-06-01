# Preval test case

# computed_prop_normalize.md

> Ai > Ai5 > Computed prop normalize
>
> Test normalization of computed property access

## Input

`````js filename=intro
const key = "prop";
const obj = { prop: 1 };
const x = obj[key];
$(x);

// Expected:
// const key = "prop";
// const obj = { prop: 1 };
// const x = obj.prop;
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
const key = `prop`;
const obj = { prop: 1 };
const x = obj[key];
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
