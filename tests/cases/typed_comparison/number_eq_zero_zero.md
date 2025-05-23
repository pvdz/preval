# Preval test case

# number_eq_zero_zero.md

> Typed comparison > Number eq zero zero
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(0));
const y = x === 0;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(0);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(0), `string`);
$(`out:`, false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
$coerce( a, "string" );
$( "out:", false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpStringFirstArg = $(0);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === 0;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
