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
$($Number_NaN);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpBinBothLhs = a;
a = undefined;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
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
