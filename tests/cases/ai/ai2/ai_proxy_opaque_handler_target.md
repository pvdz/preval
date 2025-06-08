# Preval test case

# ai_proxy_opaque_handler_target.md

> Ai > Ai2 > Ai proxy opaque handler target
>
> Test: Proxy constructor with opaque target and handler.

## Input

`````js filename=intro
// Expected: Proxy creation preserved. Access via proxy uses opaque handler methods.
let opaque_target = $('proxy_target', { id: 'target' });
let opaque_handler = $('proxy_handler', {
  get: function(target, prop, receiver) {
    $('proxy_get_called', prop);
    return $('proxy_get_return', 'val_from_proxy_get');
  },
  set: function(target, prop, value, receiver) {
    $('proxy_set_called', prop, value);
    return $('proxy_set_return', true);
  }
});

let proxy = new Proxy(opaque_target, opaque_handler);

$('proxy_access_get', proxy[$('proxy_access_key_get', 'someProp')]);
proxy[$('proxy_access_key_set', 'anotherProp')] = $('proxy_set_value', 123);
$('proxy_target_prop_after_set', opaque_target[$('proxy_access_key_set')]); // Check if original target was affected based on handler logic
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { id: `target` };
const opaque_target /*:unknown*/ = $(`proxy_target`, tmpCalleeParam);
const tmpObjLitVal /*:(unused, unknown, unused)=>unknown*/ = function ($$0, $$1, $$2) {
  const prop /*:unknown*/ = $$1;
  debugger;
  $(`proxy_get_called`, prop);
  const tmpReturnArg /*:unknown*/ = $(`proxy_get_return`, `val_from_proxy_get`);
  return tmpReturnArg;
};
const tmpObjLitVal$1 /*:(unused, unknown, unknown, unused)=>unknown*/ = function ($$0, $$1, $$2, $$3) {
  const prop$1 /*:unknown*/ = $$1;
  const value /*:unknown*/ = $$2;
  debugger;
  $(`proxy_set_called`, prop$1, value);
  const tmpReturnArg$1 /*:unknown*/ = $(`proxy_set_return`, true);
  return tmpReturnArg$1;
};
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { get: tmpObjLitVal, set: tmpObjLitVal$1 };
const opaque_handler /*:unknown*/ = $(`proxy_handler`, tmpCalleeParam$1);
const proxy /*:object*/ /*truthy*/ = new Proxy(opaque_target, opaque_handler);
const tmpCalleeParam$5 /*:unknown*/ = $(`proxy_access_key_get`, `someProp`);
const tmpCalleeParam$3 /*:unknown*/ = proxy[tmpCalleeParam$5];
$(`proxy_access_get`, tmpCalleeParam$3);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`proxy_access_key_set`, `anotherProp`);
const tmpAssignComputedRhs /*:unknown*/ = $(`proxy_set_value`, 123);
proxy[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const tmpCalleeParam$9 /*:unknown*/ = $(`proxy_access_key_set`);
const tmpCalleeParam$7 /*:unknown*/ = opaque_target[tmpCalleeParam$9];
$(`proxy_target_prop_after_set`, tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const opaque_target = $(`proxy_target`, { id: `target` });
const tmpObjLitVal = function ($$0, prop, $$2) {
  $(`proxy_get_called`, prop);
  const tmpReturnArg = $(`proxy_get_return`, `val_from_proxy_get`);
  return tmpReturnArg;
};
const tmpObjLitVal$1 = function ($$0, prop$1, value, $$3) {
  $(`proxy_set_called`, prop$1, value);
  const tmpReturnArg$1 = $(`proxy_set_return`, true);
  return tmpReturnArg$1;
};
const opaque_handler = $(`proxy_handler`, { get: tmpObjLitVal, set: tmpObjLitVal$1 });
const proxy = new Proxy(opaque_target, opaque_handler);
const tmpCalleeParam$5 = $(`proxy_access_key_get`, `someProp`);
$(`proxy_access_get`, proxy[tmpCalleeParam$5]);
const tmpAssignComMemLhsProp = $(`proxy_access_key_set`, `anotherProp`);
const tmpAssignComputedRhs = $(`proxy_set_value`, 123);
proxy[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const tmpCalleeParam$9 = $(`proxy_access_key_set`);
$(`proxy_target_prop_after_set`, opaque_target[tmpCalleeParam$9]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { id: "target" };
const b = $( "proxy_target", a );
const c = function($$0,$$1,$$2 ) {
  const d = $$1;
  debugger;
  $( "proxy_get_called", d );
  const e = $( "proxy_get_return", "val_from_proxy_get" );
  return e;
};
const f = function($$0,$$1,$$2,$$3 ) {
  const g = $$1;
  const h = $$2;
  debugger;
  $( "proxy_set_called", g, h );
  const i = $( "proxy_set_return", true );
  return i;
};
const j = {
  get: c,
  set: f,
};
const k = $( "proxy_handler", j );
const l = new Proxy( b, k );
const m = $( "proxy_access_key_get", "someProp" );
const n = l[ m ];
$( "proxy_access_get", n );
const o = $( "proxy_access_key_set", "anotherProp" );
const p = $( "proxy_set_value", 123 );
l[o] = p;
const q = $( "proxy_access_key_set" );
const r = b[ q ];
$( "proxy_target_prop_after_set", r );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { id: `target` };
let opaque_target = $(`proxy_target`, tmpCalleeParam);
const tmpObjLitVal = function ($$0, $$1, $$2) {
  let target = $$0;
  let prop = $$1;
  let receiver = $$2;
  debugger;
  $(`proxy_get_called`, prop);
  const tmpReturnArg = $(`proxy_get_return`, `val_from_proxy_get`);
  return tmpReturnArg;
};
const tmpObjLitVal$1 = function ($$0, $$1, $$2, $$3) {
  let target$1 = $$0;
  let prop$1 = $$1;
  let value = $$2;
  let receiver$1 = $$3;
  debugger;
  $(`proxy_set_called`, prop$1, value);
  const tmpReturnArg$1 = $(`proxy_set_return`, true);
  return tmpReturnArg$1;
};
let tmpCalleeParam$1 = { get: tmpObjLitVal, set: tmpObjLitVal$1 };
let opaque_handler = $(`proxy_handler`, tmpCalleeParam$1);
let proxy = new Proxy(opaque_target, opaque_handler);
const tmpCompObj = proxy;
const tmpCalleeParam$5 = $(`proxy_access_key_get`, `someProp`);
let tmpCalleeParam$3 = tmpCompObj[tmpCalleeParam$5];
$(`proxy_access_get`, tmpCalleeParam$3);
const tmpAssignComMemLhsObj = proxy;
const tmpAssignComMemLhsProp = $(`proxy_access_key_set`, `anotherProp`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(`proxy_set_value`, 123);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpCompObj$1 = opaque_target;
const tmpCalleeParam$9 = $(`proxy_access_key_set`);
let tmpCalleeParam$7 = tmpCompObj$1[tmpCalleeParam$9];
$(`proxy_target_prop_after_set`, tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Proxy


## Runtime Outcome


Should call `$` with:
 - 1: 'proxy_target', { id: '"target"' }
 - 2: 'proxy_handler', { get: '"<function>"', set: '"<function>"' }
 - eval returned: ('<crash[ Cannot create proxy with a non-object as target or handler ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
