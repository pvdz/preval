# Preval test case

# complex_object_complex_args.md

> Normalize > Call > Complex object complex args
>
> Calls should have simple objects

## Input

`````js filename=intro
const a = {b: $};
$(a).b($(1), $(2));
`````


## Settled


`````js filename=intro
const a /*:object*/ = { b: $ };
const tmpCallObj /*:unknown*/ = $(a);
const tmpCallVal /*:unknown*/ = tmpCallObj.b;
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
$dotCall(tmpCallVal, tmpCallObj, `b`, tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallObj = $({ b: $ });
tmpCallObj.b($(1), $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = b.b;
const d = $( 1 );
const e = $( 2 );
$dotCall( c, b, "b", d, e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
