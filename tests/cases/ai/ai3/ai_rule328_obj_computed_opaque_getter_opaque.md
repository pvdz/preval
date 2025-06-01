# Preval test case

# ai_rule328_obj_computed_opaque_getter_opaque.md

> Ai > Ai3 > Ai rule328 obj computed opaque getter opaque
>
> Test: Object with computed opaque property name and getter returning opaque value.

## Input

`````js filename=intro
// Expected: let prop = $('prop_name'); let obj = { [prop]: { get() { return $('getter_val'); } } }; $('result', obj[prop].get());
let propName = $('prop_name');
let obj = {
  [propName]: { 
    get() { 
      $('getter_called');
      return $('getter_val'); 
    }
  }
};
let val = obj[propName]; // Access the getter
$('result', val);
// Second access to ensure getter is called again if property is re-accessed
let val2 = obj[propName];
$('result2', val2);
`````


## Settled


`````js filename=intro
const propName /*:unknown*/ = $(`prop_name`);
const tmpObjLitPropVal /*:object*/ = {
  get() {
    debugger;
    $(`getter_called`);
    const tmpReturnArg /*:unknown*/ = $(`getter_val`);
    return tmpReturnArg;
  },
};
const obj /*:object*/ = { [propName]: tmpObjLitPropVal };
const val /*:unknown*/ = obj[propName];
$(`result`, val);
const val2 /*:unknown*/ = obj[propName];
$(`result2`, val2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const propName = $(`prop_name`);
const tmpObjLitPropVal = {
  get() {
    $(`getter_called`);
    const tmpReturnArg = $(`getter_val`);
    return tmpReturnArg;
  },
};
const obj = { [propName]: tmpObjLitPropVal };
$(`result`, obj[propName]);
$(`result2`, obj[propName]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "prop_name" );
const b = { get(  ) {
  debugger;
  $( "getter_called" );
  const c = $( "getter_val" );
  return c;
} };
const d = { [ a ]: b };
const e = d[ a ];
$( "result", e );
const f = d[ a ];
$( "result2", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let propName = $(`prop_name`);
const tmpObjLitPropKey = propName;
const tmpObjLitPropVal = {
  get() {
    debugger;
    $(`getter_called`);
    const tmpReturnArg = $(`getter_val`);
    return tmpReturnArg;
  },
};
let obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
let val = obj[propName];
$(`result`, val);
let val2 = obj[propName];
$(`result2`, val2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prop_name'
 - 2: 'result', { get: '"<function>"' }
 - 3: 'result2', { get: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
