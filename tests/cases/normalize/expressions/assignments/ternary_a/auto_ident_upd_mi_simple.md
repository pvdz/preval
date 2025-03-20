# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) ? $(100) : $(200));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
$(tmpClusterSSA_tmpCalleeParam$1);
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(200));
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 200 );
$( a );
$( 0, 0 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 200
 - 2: 200
 - 3: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
