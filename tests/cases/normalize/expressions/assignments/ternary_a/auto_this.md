# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Ternary a > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = this) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
$(tmpClusterSSA_tmpCalleeParam$1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(200));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 200 );
$( a );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 200
 - 2: 200
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
