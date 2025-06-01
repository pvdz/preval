# Preval test case

# ai_ternary_constant_condition.md

> Ai > Ai1 > Ai ternary constant condition
>
> Test: Ternary operator with a constant condition.

## Input

`````js filename=intro
// Expected (true case): let tmp = $("A"); let r1 = tmp; $("r1_val", r1);
// Expected (false case): let tmp2 = $("C"); let r2 = tmp2; $("r2_val", r2);
let r1 = true ? $("A") : $("B_never");
$("r1_val", r1);

let r2 = false ? $("D_never") : $("C");
$("r2_val", r2);
`````


## Settled


`````js filename=intro
const r1 /*:unknown*/ = $(`A`);
$(`r1_val`, r1);
const r2 /*:unknown*/ = $(`C`);
$(`r2_val`, r2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`r1_val`, $(`A`));
$(`r2_val`, $(`C`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "A" );
$( "r1_val", a );
const b = $( "C" );
$( "r2_val", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let r1 = undefined;
r1 = $(`A`);
$(`r1_val`, r1);
let r2 = undefined;
r2 = $(`C`);
$(`r2_val`, r2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'r1_val', 'A'
 - 3: 'C'
 - 4: 'r2_val', 'C'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
