# Preval test case

# string_eq_empty_empty.md

> Typed comparison > String eq empty empty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(''));
const y = x === '';
$('out:', y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(``);
const x /*:string*/ = $coerce(tmpCalleeParam, `string`);
const y /*:boolean*/ /*banged*/ = !x;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(``), `string`);
$(`out:`, !x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "string" );
const c = !b;
$( "out:", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(``);
const x = $coerce(tmpCalleeParam, `string`);
const y = x === ``;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
