# Preval test case

# computed_property_obj_1.md

> Array > Computed property obj 1
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {1: 'pass'};
$(x[[1]]);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:object*/ /*truthy*/ = { [1]: `pass` };
const tmpCalleeParam /*:unknown*/ = tmpCompObj[`1`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [1]: `pass` }[`1`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 1 ]: "pass" };
const b = a[ "1" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { [1]: `pass` };
const tmpCompObj = x;
const tmpCalleeParam$1 = [1];
let tmpCalleeParam = tmpCompObj[tmpCalleeParam$1];
$(tmpCalleeParam);
`````


## Todos triggered


None


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
