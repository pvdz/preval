# Preval test case

# computed_property_obj_empty.md

> Array > Computed property obj empty
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {'': 'pass'};
$(x[[]]);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:object*/ /*truthy*/ = { [``]: `pass` };
const tmpCalleeParam /*:unknown*/ = tmpCompObj[``];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [``]: `pass` }[``]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "" ]: "pass" };
const b = a[ "" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { [``]: `pass` };
const tmpCompObj = x;
const tmpCalleeParam$1 = [];
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
