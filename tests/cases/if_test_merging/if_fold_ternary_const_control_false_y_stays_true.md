# Preval test case

# if_fold_ternary_const_control_false_y_stays_true.md

> If test merging > If fold ternary const control false y stays true

## Input

`````js filename=intro
// Simulate prior simplification of control variable:
const controlVarInfo = { value: false }; 
let target_Y = !controlVarInfo.value; // target_Y is initially true

if (controlVarInfo.value) { // Should be seen as if(false)
  // This branch is dead
  target_Y = 0; 
} else {
  // target_Y not reassigned, or reassigned to another truthy value
  // e.g., target_Y = { id: 1 };
}

// After the if, target_Y should be consistently true.
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
const controlVarInfo = { value: false };
const tmpUnaryArg = controlVarInfo.value;
let target_Y = !tmpUnaryArg;
const tmpIfTest = controlVarInfo.value;
if (tmpIfTest) {
  target_Y = 0;
} else {
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
