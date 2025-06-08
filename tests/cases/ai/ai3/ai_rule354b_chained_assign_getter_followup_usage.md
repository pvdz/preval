# Preval test case

# ai_rule354b_chained_assign_getter_followup_usage.md

> Ai > Ai3 > Ai rule354b chained assign getter followup usage
>
> Test: Follow-up for chained assignment with getter. Checks if varA and objB.field retain assigned values.

## Input

`````js filename=intro
// Expected: Getter runs. store_val = 'getter_invoked'. getter_val = 'getter_return_value'.
//           varA_val = getter_val. objB_field_val = getter_val.
//           $('final_varA', varA_val). $('final_objB_field', objB_field_val). $('final_store_state', store_val).
//           $('varA_direct_check', varA_val). $('objB_field_direct_check', objB_field_val).
//           $('varA_comparison_true'). $('objB_field_comparison_true').

let side_effect_store = $('initial_store');

const objWithGetter = {
  get data() { // Literal property name 'data'
    side_effect_store = $('getter_invoked');
    return $('getter_return_value');
  }
};

let varA; // Intentionally left undefined initially
let objB = {};

// The problematic chained assignment
varA = objB.field = objWithGetter.data; 

// Log initial values from the assignment (as in Rule 354)
$('log1_varA', varA);
$('log1_objB_field', objB.field);
$('log1_store_state', side_effect_store);

// New checks: Directly log varA and objB.field after assignment
$('check_direct_varA', varA);
$('check_direct_objB_field', objB.field);

// New checks: Use varA and objB.field in comparisons
let known_getter_val = $('getter_return_value_ref'); // For comparison

if (varA === known_getter_val) {
  $('varA_comparison_true');
} else {
  $('varA_comparison_false', varA, known_getter_val);
}

if (objB.field === known_getter_val) {
  $('objB_field_comparison_true');
} else {
  $('objB_field_comparison_false', objB.field, known_getter_val);
}

// Check if a new variable assigned from varA also holds the value
let varC = varA;
$('check_varC_from_varA', varC);
`````


## Settled


`````js filename=intro
let side_effect_store /*:unknown*/ = $(`initial_store`);
const objWithGetter /*:object*/ /*truthy*/ = {
  get data() {
    debugger;
    side_effect_store = $(`getter_invoked`);
    const tmpReturnArg /*:unknown*/ = $(`getter_return_value`);
    return tmpReturnArg;
  },
};
const tmpNestedPropAssignRhs /*:unknown*/ = objWithGetter.data;
$(`log1_varA`, tmpNestedPropAssignRhs);
$(`log1_objB_field`, tmpNestedPropAssignRhs);
$(`log1_store_state`, side_effect_store);
$(`check_direct_varA`, tmpNestedPropAssignRhs);
$(`check_direct_objB_field`, tmpNestedPropAssignRhs);
const known_getter_val /*:unknown*/ = $(`getter_return_value_ref`);
const tmpIfTest /*:boolean*/ = tmpNestedPropAssignRhs === known_getter_val;
if (tmpIfTest) {
  $(`varA_comparison_true`);
} else {
  $(`varA_comparison_false`, tmpNestedPropAssignRhs, known_getter_val);
}
const tmpIfTest$1 /*:boolean*/ = tmpNestedPropAssignRhs === known_getter_val;
if (tmpIfTest$1) {
  $(`objB_field_comparison_true`);
  $(`check_varC_from_varA`, tmpNestedPropAssignRhs);
} else {
  $(`objB_field_comparison_false`, tmpNestedPropAssignRhs, known_getter_val);
  $(`check_varC_from_varA`, tmpNestedPropAssignRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let side_effect_store = $(`initial_store`);
const tmpNestedPropAssignRhs = {
  get data() {
    side_effect_store = $(`getter_invoked`);
    const tmpReturnArg = $(`getter_return_value`);
    return tmpReturnArg;
  },
}.data;
$(`log1_varA`, tmpNestedPropAssignRhs);
$(`log1_objB_field`, tmpNestedPropAssignRhs);
$(`log1_store_state`, side_effect_store);
$(`check_direct_varA`, tmpNestedPropAssignRhs);
$(`check_direct_objB_field`, tmpNestedPropAssignRhs);
const known_getter_val = $(`getter_return_value_ref`);
if (tmpNestedPropAssignRhs === known_getter_val) {
  $(`varA_comparison_true`);
} else {
  $(`varA_comparison_false`, tmpNestedPropAssignRhs, known_getter_val);
}
if (tmpNestedPropAssignRhs === known_getter_val) {
  $(`objB_field_comparison_true`);
  $(`check_varC_from_varA`, tmpNestedPropAssignRhs);
} else {
  $(`objB_field_comparison_false`, tmpNestedPropAssignRhs, known_getter_val);
  $(`check_varC_from_varA`, tmpNestedPropAssignRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "initial_store" );
const b = { get data() {
  debugger;
  a = $( "getter_invoked" );
  const c = $( "getter_return_value" );
  return c;
} };
const d = b.data;
$( "log1_varA", d );
$( "log1_objB_field", d );
$( "log1_store_state", a );
$( "check_direct_varA", d );
$( "check_direct_objB_field", d );
const e = $( "getter_return_value_ref" );
const f = d === e;
if (f) {
  $( "varA_comparison_true" );
}
else {
  $( "varA_comparison_false", d, e );
}
const g = d === e;
if (g) {
  $( "objB_field_comparison_true" );
  $( "check_varC_from_varA", d );
}
else {
  $( "objB_field_comparison_false", d, e );
  $( "check_varC_from_varA", d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let side_effect_store = $(`initial_store`);
const objWithGetter = {
  get data() {
    debugger;
    side_effect_store = $(`getter_invoked`);
    const tmpReturnArg = $(`getter_return_value`);
    return tmpReturnArg;
  },
};
let varA = undefined;
let objB = {};
const tmpNestedAssignPropRhs = objWithGetter.data;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
objB.field = tmpNestedPropAssignRhs;
varA = tmpNestedPropAssignRhs;
$(`log1_varA`, tmpNestedPropAssignRhs);
let tmpCalleeParam = objB.field;
$(`log1_objB_field`, tmpCalleeParam);
$(`log1_store_state`, side_effect_store);
$(`check_direct_varA`, varA);
let tmpCalleeParam$1 = objB.field;
$(`check_direct_objB_field`, tmpCalleeParam$1);
let known_getter_val = $(`getter_return_value_ref`);
const tmpIfTest = varA === known_getter_val;
if (tmpIfTest) {
  $(`varA_comparison_true`);
} else {
  $(`varA_comparison_false`, varA, known_getter_val);
}
const tmpBinLhs = objB.field;
const tmpIfTest$1 = tmpBinLhs === known_getter_val;
if (tmpIfTest$1) {
  $(`objB_field_comparison_true`);
} else {
  let tmpCalleeParam$3 = objB.field;
  let tmpCalleeParam$5 = known_getter_val;
  $(`objB_field_comparison_false`, tmpCalleeParam$3, known_getter_val);
}
let varC = varA;
$(`check_varC_from_varA`, varA);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_store'
 - 2: 'getter_invoked'
 - 3: 'getter_return_value'
 - 4: 'log1_varA', 'getter_return_value'
 - 5: 'log1_objB_field', 'getter_return_value'
 - 6: 'log1_store_state', 'getter_invoked'
 - 7: 'check_direct_varA', 'getter_return_value'
 - 8: 'check_direct_objB_field', 'getter_return_value'
 - 9: 'getter_return_value_ref'
 - 10: 'varA_comparison_false', 'getter_return_value', 'getter_return_value_ref'
 - 11: 'objB_field_comparison_false', 'getter_return_value', 'getter_return_value_ref'
 - 12: 'check_varC_from_varA', 'getter_return_value'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
