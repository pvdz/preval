# Preval test case

# number_neq_one_one.md

> Typed comparison > Number neq one one
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(1));
const y = x !== 1;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
$coerce(tmpCalleeParam, `string`);
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
let tmpCalleeParam = $(1);
const x = $coerce(tmpCalleeParam, `string`);
const y = x !== 1;
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
