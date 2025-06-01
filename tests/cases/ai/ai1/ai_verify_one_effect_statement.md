# Preval test case

# ai_verify_one_effect_statement.md

> Ai > Ai1 > Ai verify one effect statement
>
> Test: Verify one-observable-side-effect-per-statement, especially for sequences of calls.

## Input

`````js filename=intro
// Expected: Similar structure: let a = $("1"); let b = $("2"); $("A", a); $("B", b);
let init_a = $("1");
let init_b = $("2");
// The following two calls should remain distinct ExpressionStatements
$("A", init_a); 
$("B", init_b);
`````


## Settled


`````js filename=intro
const init_a /*:unknown*/ = $(`1`);
const init_b /*:unknown*/ = $(`2`);
$(`A`, init_a);
$(`B`, init_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const init_a = $(`1`);
const init_b = $(`2`);
$(`A`, init_a);
$(`B`, init_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "1" );
const b = $( "2" );
$( "A", a );
$( "B", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let init_a = $(`1`);
let init_b = $(`2`);
$(`A`, init_a);
$(`B`, init_b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1'
 - 2: '2'
 - 3: 'A', '1'
 - 4: 'B', '2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
