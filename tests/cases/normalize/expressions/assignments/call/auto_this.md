# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Call > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = this));
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
