# Preval test case

# if_fold_ternary_const_control_true_y_becomes_true.md

> If test merging > If fold ternary const control true y becomes true

## Input

`````js filename=intro
// Simulate prior simplification of control variable by other rules:
const controlVarInfo = { value: true }; // Helper to ensure it's seen as effectively true
let target_Y = !controlVarInfo.value; // target_Y is initially false

if (controlVarInfo.value) { // This should ideally be seen as if(true) by the rule if it's a BooleanLiteral
  target_Y = "new_truthy_value"; 
} else {
  // This branch should be dead if controlVarInfo.value is true
  target_Y = 0; 
}

// After the if, target_Y should be consistently "new_truthy_value" (truthy).
if (target_Y) { 
  $('RESULT_THEN'); 
} else { 
  $('RESULT_ELSE'); 
}
`````


## Settled


`````js filename=intro
$(`RESULT_THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`RESULT_THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "RESULT_THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const controlVarInfo = { value: true };
const tmpUnaryArg = controlVarInfo.value;
let target_Y = !tmpUnaryArg;
const tmpIfTest = controlVarInfo.value;
if (tmpIfTest) {
  target_Y = `new_truthy_value`;
} else {
  target_Y = 0;
}
if (target_Y) {
  $(`RESULT_THEN`);
} else {
  $(`RESULT_ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'RESULT_THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
