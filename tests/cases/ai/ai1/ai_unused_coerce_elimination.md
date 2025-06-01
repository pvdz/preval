# Preval test case

# ai_unused_coerce_elimination.md

> Ai > Ai1 > Ai unused coerce elimination
>
> Test: Elimination of an unused $coerce operation.

## Input

`````js filename=intro
// Expected: let x = $("input"); $("done", x);
let x = $("input");
$coerce(x, "string"); // The result of this $coerce is unused
$("done", x);        // Original x is used
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`input`);
$coerce(x, `string`);
$(`done`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`input`);
$coerce(x, `string`);
$(`done`, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input" );
$coerce( a, "string" );
$( "done", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`input`);
$coerce(x, `string`);
$(`done`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 'done', 'input'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
