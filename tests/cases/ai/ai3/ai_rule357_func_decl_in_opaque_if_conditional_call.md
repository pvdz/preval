# Preval test case

# ai_rule357_func_decl_in_opaque_if_conditional_call.md

> Ai > Ai3 > Ai rule357 func decl in opaque if conditional call
>
> Test: Function declared in opaque if block, conditionally called.

## Input

`````js filename=intro
// Expected: (logic for conditional declaration and call preserved)
let f_ref_outer;
if ($('condition_for_decl')) {
  function inner_func() {
    $('inner_func_executed');
    return $('inner_func_return');
  }
  f_ref_outer = inner_func;
  $('func_assigned_to_ref');
}

if (typeof f_ref_outer === 'function') {
  $('calling_f_ref_outer');
  let call_res = f_ref_outer();
  $('f_ref_outer_called_res', call_res);
} else {
  $('f_ref_outer_not_a_function');
}
$('done');
`````


## Settled


`````js filename=intro
let f_ref_outer /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(`condition_for_decl`);
if (tmpIfTest) {
  f_ref_outer = function () {
    debugger;
    $(`inner_func_executed`);
    const tmpReturnArg /*:unknown*/ = $(`inner_func_return`);
    return tmpReturnArg;
  };
  $(`func_assigned_to_ref`);
} else {
}
const tmpBinLhs /*:string*/ /*truthy*/ = typeof f_ref_outer;
const tmpIfTest$1 /*:boolean*/ = tmpBinLhs === `function`;
if (tmpIfTest$1) {
  $(`calling_f_ref_outer`);
  const call_res /*:unknown*/ = f_ref_outer();
  $(`f_ref_outer_called_res`, call_res);
  $(`done`);
} else {
  $(`f_ref_outer_not_a_function`);
  $(`done`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f_ref_outer = undefined;
if ($(`condition_for_decl`)) {
  f_ref_outer = function () {
    $(`inner_func_executed`);
    const tmpReturnArg = $(`inner_func_return`);
    return tmpReturnArg;
  };
  $(`func_assigned_to_ref`);
}
if (typeof f_ref_outer === `function`) {
  $(`calling_f_ref_outer`);
  $(`f_ref_outer_called_res`, f_ref_outer());
  $(`done`);
} else {
  $(`f_ref_outer_not_a_function`);
  $(`done`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( "condition_for_decl" );
if (b) {
  a = function() {
    debugger;
    $( "inner_func_executed" );
    const c = $( "inner_func_return" );
    return c;
  };
  $( "func_assigned_to_ref" );
}
const d = typeof a;
const e = d === "function";
if (e) {
  $( "calling_f_ref_outer" );
  const f = a();
  $( "f_ref_outer_called_res", f );
  $( "done" );
}
else {
  $( "f_ref_outer_not_a_function" );
  $( "done" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f_ref_outer = undefined;
const tmpIfTest = $(`condition_for_decl`);
if (tmpIfTest) {
  let inner_func = function () {
    debugger;
    $(`inner_func_executed`);
    const tmpReturnArg = $(`inner_func_return`);
    return tmpReturnArg;
  };
  f_ref_outer = inner_func;
  $(`func_assigned_to_ref`);
} else {
}
const tmpBinLhs = typeof f_ref_outer;
const tmpIfTest$1 = tmpBinLhs === `function`;
if (tmpIfTest$1) {
  $(`calling_f_ref_outer`);
  let call_res = f_ref_outer();
  $(`f_ref_outer_called_res`, call_res);
  $(`done`);
} else {
  $(`f_ref_outer_not_a_function`);
  $(`done`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'condition_for_decl'
 - 2: 'func_assigned_to_ref'
 - 3: 'calling_f_ref_outer'
 - 4: 'inner_func_executed'
 - 5: 'inner_func_return'
 - 6: 'f_ref_outer_called_res', 'inner_func_return'
 - 7: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
