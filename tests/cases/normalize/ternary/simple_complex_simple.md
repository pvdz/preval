# Preval test case

# simple_complex_simple.md

> Normalize > Ternary > Simple complex simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

## Input

`````js filename=intro
const a = 1 ? $(2) : 3
const b = 0 ? $(4) : 5
$(a, b)
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
$(a, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2), 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a, 5 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
