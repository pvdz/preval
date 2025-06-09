# Preval test case

# string_neq_bool.md

> Typed comparison > String neq bool
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($("foo"));
const y = x !== true;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`foo`);
$coerce(tmpCalleeParam, `string`);
$(`out:`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(`foo`), `string`);
$(`out:`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$coerce( a, "string" );
$( "out:", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`foo`);
const x = $coerce(tmpCalleeParam, `string`);
const y = x !== true;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
