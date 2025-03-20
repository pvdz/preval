# Preval test case

# simple_callee_complex_args.md

> Normalize > Call > Simple callee complex args
>
> Calls should have simple idents

## Input

`````js filename=intro
$($(1), $(2));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
$( a, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
