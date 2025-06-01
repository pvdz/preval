# Preval test case

# ai_rule354_chained_assign_opaque_getter_propname.md

> Ai > Ai3 > Ai rule354 chained assign opaque getter propname
>
> Expected: let store = $(\'getter_invoked\'); let rval = $(\'getter_return_value\'); let a = rval; let bf = rval; $(\'final_varA\', a); $(\'final_objB_field\', bf); $(\'final_store_state\', store);

## Input

`````js filename=intro
let side_effect_store = $('initial_store');

const objWithGetter = {
  get data() { // Literal property name 'data'
    side_effect_store = $('getter_invoked');
    return $('getter_return_value');
  }
};

let varA;
let objB = {};
// Use a literal property name to ensure Preval can see the getter access
varA = objB.field = objWithGetter.data; // Access .data directly

$('final_varA', varA);
$('final_objB_field', objB.field);
$('final_store_state', side_effect_store);
`````


## Settled


`````js filename=intro
let side_effect_store /*:unknown*/ = $(`initial_store`);
const objWithGetter /*:object*/ = {
  get data() {
    debugger;
    side_effect_store = $(`getter_invoked`);
    const tmpReturnArg /*:unknown*/ = $(`getter_return_value`);
    return tmpReturnArg;
  },
};
const tmpNestedPropAssignRhs /*:unknown*/ = objWithGetter.data;
$(`final_varA`, tmpNestedPropAssignRhs);
$(`final_objB_field`, tmpNestedPropAssignRhs);
$(`final_store_state`, side_effect_store);
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
$(`final_varA`, tmpNestedPropAssignRhs);
$(`final_objB_field`, tmpNestedPropAssignRhs);
$(`final_store_state`, side_effect_store);
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
$( "final_varA", d );
$( "final_objB_field", d );
$( "final_store_state", a );
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
$(`final_varA`, tmpNestedPropAssignRhs);
let tmpCalleeParam = objB.field;
$(`final_objB_field`, tmpCalleeParam);
$(`final_store_state`, side_effect_store);
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
 - 4: 'final_varA', 'getter_return_value'
 - 5: 'final_objB_field', 'getter_return_value'
 - 6: 'final_store_state', 'getter_invoked'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
