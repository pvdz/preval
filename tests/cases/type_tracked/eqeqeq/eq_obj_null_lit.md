# Preval test case

# eq_obj_null_lit.md

> Type tracked > Eqeqeq > Eq obj null lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = {a: 1};
$(x === null); // Must be false
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { a: 1 };
let tmpCalleeParam = x === null;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
