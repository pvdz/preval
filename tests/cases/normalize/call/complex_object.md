# Preval test case

# complex_object.md

> Normalize > Call > Complex object
>
> Calls should have simple objects

## Input

`````js filename=intro
const a = {b: $};
$(a).b(1);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { b: $ };
const tmpMCOO /*:unknown*/ = $(a);
const tmpMCF /*:unknown*/ = tmpMCOO.b;
$dotCall(tmpMCF, tmpMCOO, `b`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = $({ b: $ });
tmpMCOO.b(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = b.b;
$dotCall( c, b, "b", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = { b: $ };
const tmpMCOO = $(a);
const tmpMCF = tmpMCOO.b;
$dotCall(tmpMCF, tmpMCOO, `b`, 1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
