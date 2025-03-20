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
tmpCallObj.b(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ b: $ }).b(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
b.b( 1 );
`````


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
