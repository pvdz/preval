# Preval test case

# number_neq_one_zero.md

> Typed comparison > Number neq one zero
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(1));
const y = x !== 0;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(1);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(1), `string`);
$(`out:`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$coerce( a, "string" );
$( "out:", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpStringFirstArg = $(1);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== 0;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
