# Preval test case

# bool_neq_true_false.md

> Typed comparison > Bool neq true false
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(true));
const y = x !== false;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const x /*:boolean*/ = $boolean_constructor(tmpCalleeParam);
$(`out:`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, $boolean_constructor($(true)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $boolean_constructor( a );
$( "out:", b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
