# Preval test case

# bool_eq_string.md

> Typed comparison > Bool eq string
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x === "";
$('out:', y);
`````


## Settled


`````js filename=intro
$(false);
$(`out:`, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
$(`out:`, false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
$( "out:", false );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
