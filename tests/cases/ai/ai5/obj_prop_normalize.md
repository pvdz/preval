# Preval test case

# obj_prop_normalize.md

> Ai > Ai5 > Obj prop normalize
>
> Test normalization of object property access from bracket to dot notation

## Input

`````js filename=intro
const obj = { a: 1, b: 2 };
const x = obj["a"];
const y = obj["b"];
$(x + y);

// Expected:
// const obj = { a: 1, b: 2 };
// const x = obj.a;
// const y = obj.b;
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
const obj = { a: 1, b: 2 };
const x = obj.a;
const y = obj.b;
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
