# Preval test case

# ai_try_assign_catch_finally_equiv.md

> Ai > Ai1 > Ai try assign catch finally equiv
>
> Test: Variable reassigned in try, used in catch and finally-equivalent logic.

## Input

`````js filename=intro
// Expected: (Complex, value of x in finally_logic_* calls is key)
let x = $('initial');
try {
  $('try_block');
  x = $('try_assign');
  if ($('cond_throw')) throw $('err');
} catch (e) {
  $('catch_block_before_finally_logic');
  // Duplicated finally logic for catch path:
  $('finally_logic_catch_path', x);
}
// Duplicated finally logic for normal path:
$('finally_logic_normal_path', x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`initial`);
try {
  $(`try_block`);
  x = $(`try_assign`);
  const tmpIfTest /*:unknown*/ = $(`cond_throw`);
  if (tmpIfTest) {
    const tmpThrowArg /*:unknown*/ = $(`err`);
    throw tmpThrowArg;
  } else {
  }
} catch (e) {
  $(`catch_block_before_finally_logic`);
  $(`finally_logic_catch_path`, x);
}
$(`finally_logic_normal_path`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`initial`);
try {
  $(`try_block`);
  x = $(`try_assign`);
  if ($(`cond_throw`)) {
    const tmpThrowArg = $(`err`);
    throw tmpThrowArg;
  }
} catch (e) {
  $(`catch_block_before_finally_logic`);
  $(`finally_logic_catch_path`, x);
}
$(`finally_logic_normal_path`, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "initial" );
try {
  $( "try_block" );
  a = $( "try_assign" );
  const b = $( "cond_throw" );
  if (b) {
    const c = $( "err" );
    throw c;
  }
}
catch (d) {
  $( "catch_block_before_finally_logic" );
  $( "finally_logic_catch_path", a );
}
$( "finally_logic_normal_path", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`initial`);
try {
  $(`try_block`);
  x = $(`try_assign`);
  const tmpIfTest = $(`cond_throw`);
  if (tmpIfTest) {
    const tmpThrowArg = $(`err`);
    throw tmpThrowArg;
  } else {
  }
} catch (e) {
  $(`catch_block_before_finally_logic`);
  $(`finally_logic_catch_path`, x);
}
$(`finally_logic_normal_path`, x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial'
 - 2: 'try_block'
 - 3: 'try_assign'
 - 4: 'cond_throw'
 - 5: 'err'
 - 6: 'catch_block_before_finally_logic'
 - 7: 'finally_logic_catch_path', 'try_assign'
 - 8: 'finally_logic_normal_path', 'try_assign'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
