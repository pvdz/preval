# Preval test case

# template_eq_empty.md

> Typed comparison > Template eq empty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = `${$}`;
const y = x === '';
$('out:', y);
`````


## Settled


`````js filename=intro
const x /*:string*/ = $coerce($, `string`);
const y /*:boolean*/ = !x;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($, `string`);
$(`out:`, !x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $coerce( $, "string" );
const b = !a;
$( "out:", b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
