# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$((a = b?.x.y.z) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
