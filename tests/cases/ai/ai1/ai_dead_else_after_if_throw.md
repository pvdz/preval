# Preval test case

# ai_dead_else_after_if_throw.md

> Ai > Ai1 > Ai dead else after if throw
>
> Test: Dead else branch when if branch has unconditional throw.

## Input

`````js filename=intro
// Expected if c is true: $("COND"); $("A_IN_TRY"); $("ERR_THROWN"); $("D_CATCH", val_of_ERR_THROWN); $("E_FINALLY_BLOCK");
let c = $("COND");
try {
  if (c) {
    $("A_IN_TRY");
    throw $("ERR_THROWN");
    $("C1_AFTER_THROW_IN_IF_DEAD");
  } else {
    $("B_ELSE_BRANCH_SHOULD_BE_DEAD_IF_C_IS_TRUE");
  }
  $("C2_AFTER_IF_IN_TRY_DEAD_IF_C_IS_TRUE");
} catch (e) {
  $("D_CATCH", e);
}
$("E_FINALLY_BLOCK");
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(`COND`);
try {
  if (c) {
    $(`A_IN_TRY`);
    const tmpThrowArg /*:unknown*/ = $(`ERR_THROWN`);
    throw tmpThrowArg;
  } else {
    $(`B_ELSE_BRANCH_SHOULD_BE_DEAD_IF_C_IS_TRUE`);
    $(`C2_AFTER_IF_IN_TRY_DEAD_IF_C_IS_TRUE`);
  }
} catch (e) {
  $(`D_CATCH`, e);
}
$(`E_FINALLY_BLOCK`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(`COND`);
try {
  if (c) {
    $(`A_IN_TRY`);
    const tmpThrowArg = $(`ERR_THROWN`);
    throw tmpThrowArg;
  } else {
    $(`B_ELSE_BRANCH_SHOULD_BE_DEAD_IF_C_IS_TRUE`);
    $(`C2_AFTER_IF_IN_TRY_DEAD_IF_C_IS_TRUE`);
  }
} catch (e) {
  $(`D_CATCH`, e);
}
$(`E_FINALLY_BLOCK`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "COND" );
try {
  if (a) {
    $( "A_IN_TRY" );
    const b = $( "ERR_THROWN" );
    throw b;
  }
  else {
    $( "B_ELSE_BRANCH_SHOULD_BE_DEAD_IF_C_IS_TRUE" );
    $( "C2_AFTER_IF_IN_TRY_DEAD_IF_C_IS_TRUE" );
  }
}
catch (c) {
  $( "D_CATCH", c );
}
$( "E_FINALLY_BLOCK" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(`COND`);
try {
  if (c) {
    $(`A_IN_TRY`);
    const tmpThrowArg = $(`ERR_THROWN`);
    throw tmpThrowArg;
  } else {
    $(`B_ELSE_BRANCH_SHOULD_BE_DEAD_IF_C_IS_TRUE`);
    $(`C2_AFTER_IF_IN_TRY_DEAD_IF_C_IS_TRUE`);
  }
} catch (e) {
  $(`D_CATCH`, e);
}
$(`E_FINALLY_BLOCK`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'COND'
 - 2: 'A_IN_TRY'
 - 3: 'ERR_THROWN'
 - 4: 'D_CATCH', 'ERR_THROWN'
 - 5: 'E_FINALLY_BLOCK'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
