# Preval test case

# computed_property_arr_123.md

> Array > Computed property arr 123
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = [];
$(x[[1, 2, 3]]);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:array*/ = [];
const tmpCalleeParam /*:unknown*/ = tmpCompObj[`1,2,3`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([][`1,2,3`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = a[ "1,2,3" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [];
const tmpCompObj = x;
const tmpCalleeParam$1 = [1, 2, 3];
let tmpCalleeParam = tmpCompObj[tmpCalleeParam$1];
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
