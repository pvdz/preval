# Preval test case

# if_fold_ternary_const_control_false_y_becomes_false.md

> If test merging > If fold ternary const control false y becomes false

## Input

`````js filename=intro
// Simulate prior simplification of control variable:
const controlVarInfo = { value: false }; 
let target_Y = !controlVarInfo.value; // target_Y is initially true

if (controlVarInfo.value) { // Should be seen as if(false)
  // This branch is dead
  target_Y = "new_truthy_value"; 
} else {
  target_Y = 0; // target_Y made falsy
}

// After the if, target_Y should be consistently false.
if (target_Y) { 
  $('RESULT_THEN'); 
} else { 
  $('RESULT_ELSE'); 
}
`````


## Settled


`````js filename=intro
$(`RESULT_ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`RESULT_ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "RESULT_ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const controlVarInfo = { value: false };
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
 - 1: 'RESULT_ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
