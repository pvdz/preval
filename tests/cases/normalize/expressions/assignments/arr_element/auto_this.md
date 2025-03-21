# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Arr element > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = this) + (a = this));
$(a);
`````


## Settled


`````js filename=intro
$(NaN);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( NaN );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
