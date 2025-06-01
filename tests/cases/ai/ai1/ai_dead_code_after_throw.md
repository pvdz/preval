# Preval test case

# ai_dead_code_after_throw.md

> Ai > Ai1 > Ai dead code after throw
>
> Test: Dead code elimination after an unconditional throw statement.

## Input

`````js filename=intro
// Expected: let x = $("A"); throw x;
let err_val = $("error_value");
let x = $("A");
throw err_val; 
$("B_dead"); // This should be removed
`````


## Settled


`````js filename=intro
const err_val /*:unknown*/ = $(`error_value`);
$(`A`);
throw err_val;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const err_val = $(`error_value`);
$(`A`);
throw err_val;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "error_value" );
$( "A" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let err_val = $(`error_value`);
let x = $(`A`);
throw err_val;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'error_value'
 - 2: 'A'
 - eval returned: ('<crash[ error_value ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
