# Preval test case

# bool_neq_true_true.md

> Typed comparison > Bool neq true true
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(true));
const y = x !== true;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const x /*:boolean*/ = Boolean(tmpCalleeParam);
const y /*:boolean*/ = !x;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = Boolean($(true));
$(`out:`, !x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
const c = !b;
$( "out:", c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
