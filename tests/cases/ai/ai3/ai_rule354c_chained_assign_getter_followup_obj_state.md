# Preval test case

# ai_rule354c_chained_assign_getter_followup_obj_state.md

> Ai > Ai3 > Ai rule354c chained assign getter followup obj state
>
> Rule 354c: Chained assignment getter followup - object state check

## Input

`````js filename=intro
// Expected: Getter runs. objB.field is assigned. Object.keys(objB) includes "field".

let side_effect_store = $('initial_store');

const objWithGetter = {
  get data() {
    side_effect_store = $('getter_invoked');
    return $('getter_return_value');
  }
};

let varA;
let objB = {}; // objB starts empty

varA = objB.field = objWithGetter.data;

$('log_varA', varA);
$('log_objB_field', objB.field); // In original, this is 'getter_return_value'
$('log_store_state', side_effect_store);

// Key check
let keys = Object.keys(objB);
$('objB_keys', keys.join(',')); // Expected: "field"
$('objB_has_field', objB.hasOwnProperty('field')); // Expected: true
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
$(`log_varA`, tmpNestedPropAssignRhs);
$(`log_objB_field`, tmpNestedPropAssignRhs);
$(`log_store_state`, side_effect_store);
const objB /*:object*/ /*truthy*/ = { field: tmpNestedPropAssignRhs };
const keys /*:array*/ /*truthy*/ = $Object_keys(objB);
const tmpCalleeParam$1 /*:string*/ = $dotCall($array_join, keys, `join`, `,`);
$(`objB_keys`, tmpCalleeParam$1);
const tmpMCF$3 /*:unknown*/ = objB.hasOwnProperty;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$3, objB, `hasOwnProperty`, `field`);
$(`objB_has_field`, tmpCalleeParam$3);
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
$(`log_varA`, tmpNestedPropAssignRhs);
$(`log_objB_field`, tmpNestedPropAssignRhs);
$(`log_store_state`, side_effect_store);
const objB = { field: tmpNestedPropAssignRhs };
$(`objB_keys`, $dotCall($array_join, $Object_keys(objB), `join`, `,`));
$(`objB_has_field`, objB.hasOwnProperty(`field`));
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
$( "log_varA", d );
$( "log_objB_field", d );
$( "log_store_state", a );
const e = { field: d };
const f = $Object_keys( e );
const g = $dotCall( $array_join, f, "join", "," );
$( "objB_keys", g );
const h = e.hasOwnProperty;
const i = $dotCall( h, e, "hasOwnProperty", "field" );
$( "objB_has_field", i );
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
$(`log_varA`, tmpNestedPropAssignRhs);
let tmpCalleeParam = objB.field;
$(`log_objB_field`, tmpCalleeParam);
$(`log_store_state`, side_effect_store);
const tmpMCF = $Object_keys;
let keys = $Object_keys(objB);
const tmpMCF$1 = keys.join;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, keys, `join`, `,`);
$(`objB_keys`, tmpCalleeParam$1);
const tmpMCF$3 = objB.hasOwnProperty;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, objB, `hasOwnProperty`, `field`);
$(`objB_has_field`, tmpCalleeParam$3);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) access object property that also exists on prototype? $object_hasOwnProperty
- (todo) type trackeed tricks can possibly support static $Object_keys


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_store'
 - 2: 'getter_invoked'
 - 3: 'getter_return_value'
 - 4: 'log_varA', 'getter_return_value'
 - 5: 'log_objB_field', 'getter_return_value'
 - 6: 'log_store_state', 'getter_invoked'
 - 7: 'objB_keys', 'field'
 - 8: 'objB_has_field', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
