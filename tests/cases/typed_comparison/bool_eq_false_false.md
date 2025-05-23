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
const x /*:boolean*/ = $boolean_constructor(tmpCalleeParam);
const y /*:boolean*/ = !x;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $boolean_constructor($(false));
$(`out:`, !x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
const b = $boolean_constructor( a );
const c = !b;
$( "out:", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(false);
const x = $boolean_constructor(tmpCalleeParam);
const y = x === false;
$(`out:`, y);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
