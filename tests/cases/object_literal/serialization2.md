# Preval test case

# serialization2.md

> Object literal > Serialization2
>
> tostring

## Input

`````js filename=intro
const a = {};
const b = a + '';
$(b);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = {};
const b /*:string*/ = $coerce(a, `plustr`);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({} + ``);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $coerce( a, "plustr" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = {};
const b = $coerce(a, `plustr`);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '[object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
