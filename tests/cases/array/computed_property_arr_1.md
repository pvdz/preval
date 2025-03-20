# Preval test case

# computed_property_arr_1.md

> Array > Computed property arr 1
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = ['fail', 'pass'];
$(x[[1]]);
`````


## Settled


`````js filename=intro
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````


## Todos triggered


- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
