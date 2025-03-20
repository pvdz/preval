# Preval test case

# eq_null_lit_obj.md

> Type tracked > Eqeqeq > Eq null lit obj
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = {a: 1};
$(null === x); // Must be false
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
