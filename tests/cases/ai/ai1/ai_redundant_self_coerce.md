# Preval test case

# ai_redundant_self_coerce.md

> Ai > Ai1 > Ai redundant self coerce
>
> Test: Redundant $coerce of a variable to its already known $coerce'd type.

## Input

`````js filename=intro
// Expected: let y = $("unknown"); let x = $coerce(y, "number"); $("result", x);
let y = $("unknown");
let x = $coerce(y, "number");
let z = $coerce(x, "number"); // This $coerce is redundant
$("result", z);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(`unknown`);
const z /*:number*/ = $coerce(y, `number`);
$(`result`, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result`, $coerce($(`unknown`), `number`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "unknown" );
const b = $coerce( a, "number" );
$( "result", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = $(`unknown`);
let x = $coerce(y, `number`);
let z = $coerce(x, `number`);
$(`result`, z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'unknown'
 - 2: 'result', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
