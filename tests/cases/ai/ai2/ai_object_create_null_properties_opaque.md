# Preval test case

# ai_object_create_null_properties_opaque.md

> Ai > Ai2 > Ai object create null properties opaque
>
> Test: Object.create(null) with opaque property interactions.

## Input

`````js filename=intro
// Expected: Object has no prototype, properties work as defined.
let obj = Object.create(null);
let key1_name = $('key1_null_proto_name', 'prop_a');
let val1_val = $('val1_null_proto_val', 'value_a');

obj[key1_name] = val1_val;
$('obj_null_proto_get_val1', obj[key1_name]);

// Check for a common prototype property that should be absent
$('obj_null_proto_has_toString', typeof obj.toString === 'undefined');

// Redefine a property that would normally be on Object.prototype
obj.hasOwnProperty = $('redefined_hasownproperty_func', function(p) { return $('fake_hasOwnProperty_called', p); });
$('obj_null_proto_hasOwnProperty_is_func', typeof obj.hasOwnProperty === 'function');
$('obj_null_proto_call_fake_hasOwnProperty', obj.hasOwnProperty('prop_a'));
`````


## Settled


`````js filename=intro
const obj /*:object*/ = $Object_create(null);
const key1_name /*:unknown*/ = $(`key1_null_proto_name`, `prop_a`);
const val1_val /*:unknown*/ = $(`val1_null_proto_val`, `value_a`);
obj[key1_name] = val1_val;
const tmpCalleeParam /*:unknown*/ = obj[key1_name];
$(`obj_null_proto_get_val1`, tmpCalleeParam);
const tmpUnaryArg /*:unknown*/ = obj.toString;
const tmpBinLhs /*:string*/ = typeof tmpUnaryArg;
const tmpCalleeParam$1 /*:boolean*/ = tmpBinLhs === `undefined`;
$(`obj_null_proto_has_toString`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:(unknown)=>unknown*/ = function ($$0) {
  const p /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`fake_hasOwnProperty_called`, p);
  return tmpReturnArg;
};
const tmpAssignMemRhs /*:unknown*/ = $(`redefined_hasownproperty_func`, tmpCalleeParam$3);
obj.hasOwnProperty = tmpAssignMemRhs;
const tmpUnaryArg$1 /*:unknown*/ = obj.hasOwnProperty;
const tmpBinLhs$1 /*:string*/ = typeof tmpUnaryArg$1;
const tmpCalleeParam$5 /*:boolean*/ = tmpBinLhs$1 === `function`;
$(`obj_null_proto_hasOwnProperty_is_func`, tmpCalleeParam$5);
const tmpMCF$1 /*:unknown*/ = obj.hasOwnProperty;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF$1, obj, `hasOwnProperty`, `prop_a`);
$(`obj_null_proto_call_fake_hasOwnProperty`, tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $Object_create(null);
const key1_name = $(`key1_null_proto_name`, `prop_a`);
const val1_val = $(`val1_null_proto_val`, `value_a`);
obj[key1_name] = val1_val;
$(`obj_null_proto_get_val1`, obj[key1_name]);
const tmpUnaryArg = obj.toString;
$(`obj_null_proto_has_toString`, typeof tmpUnaryArg === `undefined`);
obj.hasOwnProperty = $(`redefined_hasownproperty_func`, function (p) {
  const tmpReturnArg = $(`fake_hasOwnProperty_called`, p);
  return tmpReturnArg;
});
const tmpUnaryArg$1 = obj.hasOwnProperty;
$(`obj_null_proto_hasOwnProperty_is_func`, typeof tmpUnaryArg$1 === `function`);
$(`obj_null_proto_call_fake_hasOwnProperty`, obj.hasOwnProperty(`prop_a`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_create( null );
const b = $( "key1_null_proto_name", "prop_a" );
const c = $( "val1_null_proto_val", "value_a" );
a[b] = c;
const d = a[ b ];
$( "obj_null_proto_get_val1", d );
const e = a.toString;
const f = typeof e;
const g = f === "undefined";
$( "obj_null_proto_has_toString", g );
const h = function($$0 ) {
  const i = $$0;
  debugger;
  const j = $( "fake_hasOwnProperty_called", i );
  return j;
};
const k = $( "redefined_hasownproperty_func", h );
a.hasOwnProperty = k;
const l = a.hasOwnProperty;
const m = typeof l;
const n = m === "function";
$( "obj_null_proto_hasOwnProperty_is_func", n );
const o = a.hasOwnProperty;
const p = $dotCall( o, a, "hasOwnProperty", "prop_a" );
$( "obj_null_proto_call_fake_hasOwnProperty", p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Object_create;
let obj = $Object_create(null);
let key1_name = $(`key1_null_proto_name`, `prop_a`);
let val1_val = $(`val1_null_proto_val`, `value_a`);
obj[key1_name] = val1_val;
let tmpCalleeParam = obj[key1_name];
$(`obj_null_proto_get_val1`, tmpCalleeParam);
const tmpUnaryArg = obj.toString;
const tmpBinLhs = typeof tmpUnaryArg;
let tmpCalleeParam$1 = tmpBinLhs === `undefined`;
$(`obj_null_proto_has_toString`, tmpCalleeParam$1);
const tmpAssignMemLhsObj = obj;
let tmpCalleeParam$3 = function ($$0) {
  let p = $$0;
  debugger;
  const tmpReturnArg = $(`fake_hasOwnProperty_called`, p);
  return tmpReturnArg;
};
const tmpAssignMemRhs = $(`redefined_hasownproperty_func`, tmpCalleeParam$3);
tmpAssignMemLhsObj.hasOwnProperty = tmpAssignMemRhs;
const tmpUnaryArg$1 = obj.hasOwnProperty;
const tmpBinLhs$1 = typeof tmpUnaryArg$1;
let tmpCalleeParam$5 = tmpBinLhs$1 === `function`;
$(`obj_null_proto_hasOwnProperty_is_func`, tmpCalleeParam$5);
const tmpMCF$1 = obj.hasOwnProperty;
let tmpCalleeParam$7 = $dotCall(tmpMCF$1, obj, `hasOwnProperty`, `prop_a`);
$(`obj_null_proto_call_fake_hasOwnProperty`, tmpCalleeParam$7);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $object_hasOwnProperty
- (todo) access object property that also exists on prototype? $object_toString
- (todo) type trackeed tricks can possibly support static $Object_create


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'key1_null_proto_name', 'prop_a'
 - 2: 'val1_null_proto_val', 'value_a'
 - 3: 'obj_null_proto_get_val1', 'val1_null_proto_val'
 - 4: 'obj_null_proto_has_toString', true
 - 5: 'redefined_hasownproperty_func', '<function>'
 - 6: 'obj_null_proto_hasOwnProperty_is_func', false
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
