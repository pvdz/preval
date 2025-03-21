# Preval test case

# bool_eq_false_false.md

> Typed comparison > Bool eq false false
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x === false;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(false);
const x /*:boolean*/ = Boolean(tmpCalleeParam);
const y /*:boolean*/ = !x;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = Boolean($(false));
$(`out:`, !x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
const b = Boolean( a );
const c = !b;
$( "out:", c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
