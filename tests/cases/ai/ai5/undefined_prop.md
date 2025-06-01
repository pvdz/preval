# Preval test case

# undefined_prop.md

> Ai > Ai5 > Undefined prop
>
> Test normalization of undefined property access

## Input

`````js filename=intro
const obj = { "undefined": 1 };
const x = obj[undefined];
$(x);

// Expected:
// const obj = { "undefined": 1 };
// const x = obj["undefined"];
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
const obj = { undefined: 1 };
const x = obj.undefined;
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
