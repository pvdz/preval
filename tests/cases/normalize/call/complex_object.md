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
const a /*:object*/ = { b: $ };
const tmpCallObj /*:unknown*/ = $(a);
const tmpCallCompVal /*:unknown*/ = tmpCallObj.b;
$dotCall(tmpCallCompVal, tmpCallObj, `b`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallObj = $({ b: $ });
tmpCallObj.b(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = b.b;
$dotCall( c, b, "b", 1 );
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
