# Preval test case

# string_eq_bool.md

> Typed comparison > String eq bool
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($("foo"));
const y = x === true;
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(`foo`);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(`foo`), `string`);
$(`out:`, false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$coerce( a, "string" );
$( "out:", false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpStringFirstArg = $(`foo`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === true;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
