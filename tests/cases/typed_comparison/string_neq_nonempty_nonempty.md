# Preval test case

# string_neq_nonempty_nonempty.md

> Typed comparison > String neq nonempty nonempty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($('full'));
const y = x !== 'full';
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(`full`);
const x /*:string*/ = $coerce(tmpStringFirstArg, `string`);
const y /*:boolean*/ = x !== `full`;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, $coerce($(`full`), `string`) !== `full`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "full" );
const b = $coerce( a, "string" );
const c = b !== "full";
$( "out:", c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'full'
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
