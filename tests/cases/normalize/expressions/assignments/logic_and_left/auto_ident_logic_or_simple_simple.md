# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 0 || 2) && $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
