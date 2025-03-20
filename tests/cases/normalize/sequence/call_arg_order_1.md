# Preval test case

# call_arg_order_1.md

> Normalize > Sequence > Call arg order 1
>
> In a call we can only trivially outline sequence expressions of the first arg. We can do the other ones but that requires temporary assignment of all non-ident/non-literals to ensure no side effects.

## Input

`````js filename=intro
// First
$(($(1), $(2)), $(3));
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:unknown*/ = $(3);
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2), $(3));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = $( 3 );
$( a, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
