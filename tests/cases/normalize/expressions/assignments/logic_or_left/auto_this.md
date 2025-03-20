# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Logic or left > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = this) || $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
