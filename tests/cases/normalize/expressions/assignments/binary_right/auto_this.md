# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Binary right > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = this));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + undefined;
$( b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: NaN
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
