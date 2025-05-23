# Preval test case

# bool_neq_string.md

> Typed comparison > Bool neq string
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x !== "";
$('out:', y);
`````


## Settled


`````js filename=intro
$(false);
$(`out:`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
$(`out:`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
$( "out:", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(false);
const x = $boolean_constructor(tmpCalleeParam);
const y = x !== ``;
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
