# Preval test case

# inline_obj_spread2.md

> Tofix > inline obj spread2
>
> Spread arg that is simple should not change

The first object literal should be spread into the second object literal when we have full visibility

## Input

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const tmpCalleeParam = { ...tmpObjLitVal }; // Should preval realize that this is redundant, knowing that the arg is a fresh object already?
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { bar: 10 };
const tmpCalleeParam /*:object*/ = { ...tmpObjLitVal };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
$({ ...tmpObjLitVal });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { bar: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
