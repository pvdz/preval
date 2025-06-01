# Preval test case

# unicode_prop.md

> Ai > Ai5 > Unicode prop
>
> Test normalization of unicode property access

## Input

`````js filename=intro
const obj = { "\u0061": 1 };
const x = obj["\u0061"];
$(x);

// Expected:
// const obj = { "\u0061": 1 };
// const x = obj.a;
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
const obj = { a: 1 };
const x = obj.a;
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
