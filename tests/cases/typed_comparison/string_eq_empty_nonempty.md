# Preval test case

# string_eq_empty_nonempty.md

> Typed comparison > String eq empty nonempty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(''));
const y = x === 'full';
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(``);
const x /*:string*/ = $coerce(tmpStringFirstArg, `string`);
const y /*:boolean*/ = x === `full`;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, $coerce($(``), `string`) === `full`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "string" );
const c = b === "full";
$( "out:", c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
