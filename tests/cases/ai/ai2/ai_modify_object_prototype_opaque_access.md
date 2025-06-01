# Preval test case

# ai_modify_object_prototype_opaque_access.md

> Ai > Ai2 > Ai modify object prototype opaque access
>
> Test: Opaquely modify Object.prototype, then access props.

## Input

`````js filename=intro
// Expected: New objects inherit opaquely modified/added prototype properties.
// This is generally bad practice but tests Preval's handling.
let protoKey = $('op_proto_key_name', 'newProtoPropOnObject');
let protoVal = $('op_proto_val_content', 'fromObjectProto');
let originalProtoProperty = Object.prototype[protoKey]; // Save original, if any
let propertyExisted = Object.prototype.hasOwnProperty(protoKey);

try {
  Object.prototype[protoKey] = protoVal;
  let o1 = {};
  $('obj_inherited_op_proto_prop', o1[protoKey]);
  let o2 = { [protoKey]: $('o2_own_prop_val', 'o2_has_own') };
  $('obj_with_own_shadowing_prop', o2[protoKey]);
} finally {
  // Restore Object.prototype
  if (propertyExisted) {
    Object.prototype[protoKey] = originalProtoProperty;
  } else {
    delete Object.prototype[protoKey];
  }
  $('op_proto_cleanup_done', !Object.prototype.hasOwnProperty(protoKey) || Object.prototype[protoKey] === originalProtoProperty);
}
`````


## Settled


`````js filename=intro
const protoKey /*:unknown*/ = $(`op_proto_key_name`, `newProtoPropOnObject`);
const protoVal /*:unknown*/ = $(`op_proto_val_content`, `fromObjectProto`);
const originalProtoProperty /*:unknown*/ = $Object_prototype[protoKey];
const propertyExisted /*:boolean*/ = $dotCall($object_hasOwnProperty, $Object_prototype, `hasOwnProperty`, protoKey);
let $implicitThrow /*:boolean*/ = false;
let $finalCatchArg /*:unknown*/ = undefined;
try {
  $Object_prototype[protoKey] = protoVal;
  const o1 /*:object*/ = {};
  const tmpCalleeParam /*:unknown*/ = o1[protoKey];
  $(`obj_inherited_op_proto_prop`, tmpCalleeParam);
  const tmpObjLitPropVal /*:unknown*/ = $(`o2_own_prop_val`, `o2_has_own`);
  const o2 /*:object*/ = { [protoKey]: tmpObjLitPropVal };
  const tmpCalleeParam$1 /*:unknown*/ = o2[protoKey];
  $(`obj_with_own_shadowing_prop`, tmpCalleeParam$1);
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
if (propertyExisted) {
  $Object_prototype[protoKey] = originalProtoProperty;
} else {
  delete $Object_prototype[protoKey];
}
const tmpUnaryArg /*:boolean*/ = $dotCall($object_hasOwnProperty, $Object_prototype, `hasOwnProperty`, protoKey);
if (tmpUnaryArg) {
  const tmpBinLhs /*:unknown*/ = $Object_prototype[protoKey];
  const tmpClusterSSA_tmpCalleeParam$3 /*:boolean*/ = tmpBinLhs === originalProtoProperty;
  $(`op_proto_cleanup_done`, tmpClusterSSA_tmpCalleeParam$3);
} else {
  $(`op_proto_cleanup_done`, true);
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const protoKey = $(`op_proto_key_name`, `newProtoPropOnObject`);
const protoVal = $(`op_proto_val_content`, `fromObjectProto`);
const originalProtoProperty = $Object_prototype[protoKey];
const propertyExisted = $dotCall($object_hasOwnProperty, $Object_prototype, `hasOwnProperty`, protoKey);
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $Object_prototype[protoKey] = protoVal;
  $(`obj_inherited_op_proto_prop`, {}[protoKey]);
  const tmpObjLitPropVal = $(`o2_own_prop_val`, `o2_has_own`);
  $(`obj_with_own_shadowing_prop`, { [protoKey]: tmpObjLitPropVal }[protoKey]);
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
if (propertyExisted) {
  $Object_prototype[protoKey] = originalProtoProperty;
} else {
  delete $Object_prototype[protoKey];
}
if ($dotCall($object_hasOwnProperty, $Object_prototype, `hasOwnProperty`, protoKey)) {
  $(`op_proto_cleanup_done`, $Object_prototype[protoKey] === originalProtoProperty);
} else {
  $(`op_proto_cleanup_done`, true);
}
if ($implicitThrow) {
  throw $finalCatchArg;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "op_proto_key_name", "newProtoPropOnObject" );
const b = $( "op_proto_val_content", "fromObjectProto" );
const c = $Object_prototype[ a ];
const d = $dotCall( $object_hasOwnProperty, $Object_prototype, "hasOwnProperty", a );
let e = false;
let f = undefined;
try {
  $Object_prototype[a] = b;
  const g = {};
  const h = g[ a ];
  $( "obj_inherited_op_proto_prop", h );
  const i = $( "o2_own_prop_val", "o2_has_own" );
  const j = { [ a ]: i };
  const k = j[ a ];
  $( "obj_with_own_shadowing_prop", k );
}
catch (l) {
  e = true;
  f = l;
}
if (d) {
  $Object_prototype[a] = c;
}
else {
  delete $Object_prototype[ a ];
}
const m = $dotCall( $object_hasOwnProperty, $Object_prototype, "hasOwnProperty", a );
if (m) {
  const n = $Object_prototype[ a ];
  const o = n === c;
  $( "op_proto_cleanup_done", o );
}
else {
  $( "op_proto_cleanup_done", true );
}
if (e) {
  throw f;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let protoKey = $(`op_proto_key_name`, `newProtoPropOnObject`);
let protoVal = $(`op_proto_val_content`, `fromObjectProto`);
const tmpCompObj = $Object_prototype;
let originalProtoProperty = tmpCompObj[protoKey];
const tmpMCOO = $Object_prototype;
const tmpMCF = tmpMCOO.hasOwnProperty;
let propertyExisted = $dotCall(tmpMCF, tmpMCOO, `hasOwnProperty`, protoKey);
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  const tmpAssignMemLhsObj = $Object_prototype;
  $Object_prototype[protoKey] = protoVal;
  let o1 = {};
  let tmpCalleeParam = o1[protoKey];
  $(`obj_inherited_op_proto_prop`, tmpCalleeParam);
  const tmpObjLitPropKey = protoKey;
  const tmpObjLitPropVal = $(`o2_own_prop_val`, `o2_has_own`);
  let o2 = { [tmpObjLitPropKey]: tmpObjLitPropVal };
  let tmpCalleeParam$1 = o2[protoKey];
  $(`obj_with_own_shadowing_prop`, tmpCalleeParam$1);
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
if (propertyExisted) {
  const tmpAssignMemLhsObj$1 = $Object_prototype;
  $Object_prototype[protoKey] = originalProtoProperty;
} else {
  const tmpDeleteCompObj = $Object_prototype;
  const tmpDeleteCompProp = protoKey;
  delete tmpDeleteCompObj[tmpDeleteCompProp];
}
const tmpMCOO$1 = $Object_prototype;
const tmpMCF$1 = tmpMCOO$1.hasOwnProperty;
const tmpUnaryArg = $dotCall(tmpMCF$1, tmpMCOO$1, `hasOwnProperty`, protoKey);
let tmpCalleeParam$3 = !tmpUnaryArg;
if (tmpCalleeParam$3) {
  $(`op_proto_cleanup_done`, tmpCalleeParam$3);
} else {
  const tmpCompObj$1 = $Object_prototype;
  const tmpBinLhs = tmpCompObj$1[protoKey];
  tmpCalleeParam$3 = tmpBinLhs === originalProtoProperty;
  $(`op_proto_cleanup_done`, tmpCalleeParam$3);
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $object_hasOwnProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'op_proto_key_name', 'newProtoPropOnObject'
 - 2: 'op_proto_val_content', 'fromObjectProto'
 - 3: 'obj_inherited_op_proto_prop', 'op_proto_val_content'
 - 4: 'o2_own_prop_val', 'o2_has_own'
 - 5: 'obj_with_own_shadowing_prop', 'o2_own_prop_val'
 - 6: 'op_proto_cleanup_done', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
