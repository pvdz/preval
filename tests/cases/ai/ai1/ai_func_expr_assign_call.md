# Preval test case

# ai_func_expr_assign_call.md

> Ai > Ai1 > Ai func expr assign call
>
> Test: Function expression assigned to var, then called.

## Input

`````js filename=intro
// Expected: (Function inlined, args passed, return used correctly)
let myFunc = function(a, b) {
  $('called', a, b);
  return $('ret_val');
};
let result = myFunc($('ARG1'), $('ARG2'));
$('use_result', result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`ARG1`);
const tmpCalleeParam$1 /*:unknown*/ = $(`ARG2`);
$(`called`, tmpCalleeParam, tmpCalleeParam$1);
const tmpReturnArg /*:unknown*/ = $(`ret_val`);
$(`use_result`, tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`called`, $(`ARG1`), $(`ARG2`));
$(`use_result`, $(`ret_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ARG1" );
const b = $( "ARG2" );
$( "called", a, b );
const c = $( "ret_val" );
$( "use_result", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let myFunc = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(`called`, a, b);
  const tmpReturnArg = $(`ret_val`);
  return tmpReturnArg;
};
const tmpCallCallee = myFunc;
let tmpCalleeParam = $(`ARG1`);
let tmpCalleeParam$1 = $(`ARG2`);
let result = myFunc(tmpCalleeParam, tmpCalleeParam$1);
$(`use_result`, result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ARG1'
 - 2: 'ARG2'
 - 3: 'called', 'ARG1', 'ARG2'
 - 4: 'ret_val'
 - 5: 'use_result', 'ret_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
