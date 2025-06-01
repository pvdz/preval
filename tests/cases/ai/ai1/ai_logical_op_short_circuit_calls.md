# Preval test case

# ai_logical_op_short_circuit_calls.md

> Ai > Ai1 > Ai logical op short circuit calls
>
> Test: Logical AND/OR with $() calls, verifying short-circuit path analysis after normalization.

## Input

`````js filename=intro
// Expected AND: lhs_a = $("LHS_A"); if (lhs_a) { res_and = $("RHS_A"); } else { res_and = lhs_a; } $("END_A", res_and);
// Expected OR:  lhs_o = $("LHS_O"); if (lhs_o) { res_or = lhs_o; } else { res_or = $("RHS_O"); } $("END_O", res_or);

let res_and = $("LHS_A") && $("RHS_A");
$("END_A", res_and);

let res_or = $("LHS_O") || $("RHS_O");
$("END_O", res_or);
`````


## Settled


`````js filename=intro
const res_and /*:unknown*/ = $(`LHS_A`);
if (res_and) {
  const tmpClusterSSA_res_and /*:unknown*/ = $(`RHS_A`);
  $(`END_A`, tmpClusterSSA_res_and);
} else {
  $(`END_A`, res_and);
}
const res_or /*:unknown*/ = $(`LHS_O`);
if (res_or) {
  $(`END_O`, res_or);
} else {
  const tmpClusterSSA_res_or /*:unknown*/ = $(`RHS_O`);
  $(`END_O`, tmpClusterSSA_res_or);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const res_and = $(`LHS_A`);
if (res_and) {
  $(`END_A`, $(`RHS_A`));
} else {
  $(`END_A`, res_and);
}
const res_or = $(`LHS_O`);
if (res_or) {
  $(`END_O`, res_or);
} else {
  $(`END_O`, $(`RHS_O`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "LHS_A" );
if (a) {
  const b = $( "RHS_A" );
  $( "END_A", b );
}
else {
  $( "END_A", a );
}
const c = $( "LHS_O" );
if (c) {
  $( "END_O", c );
}
else {
  const d = $( "RHS_O" );
  $( "END_O", d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let res_and = $(`LHS_A`);
if (res_and) {
  res_and = $(`RHS_A`);
  $(`END_A`, res_and);
} else {
  $(`END_A`, res_and);
}
let res_or = $(`LHS_O`);
if (res_or) {
  $(`END_O`, res_or);
} else {
  res_or = $(`RHS_O`);
  $(`END_O`, res_or);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'LHS_A'
 - 2: 'RHS_A'
 - 3: 'END_A', 'RHS_A'
 - 4: 'LHS_O'
 - 5: 'END_O', 'LHS_O'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
