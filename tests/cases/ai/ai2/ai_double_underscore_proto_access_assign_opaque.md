# Preval test case

# ai_double_underscore_proto_access_assign_opaque.md

> Ai > Ai2 > Ai double underscore proto access assign opaque
>
> Test: __proto__ access and assignment with opaque values.

## Input

`````js filename=intro
// Expected: Prototype manipulation via __proto__ preserved if not optimized away.
let obj1 = $('obj1_dunder', { a: $('val_a_dunder', 1) });
let newProtoObj = $('opaque_new_proto_for_dunder', { b: $('val_b_dunder', 2) });

obj1.__proto__ = newProtoObj;
$('obj1_b_via_dunder_proto', obj1.b); // Should be 2 from newProtoObj
$('obj1_a_still_present', obj1.a); // Should be 1 from obj1 itself
$('obj1_proto_is_newProto', Object.getPrototypeOf(obj1) === newProtoObj);

let obj2 = $('obj2_dunder', {});
let protoOfObj2 = obj2.__proto__; // Get prototype
$('obj2_dunder_proto_is_object_prototype', protoOfObj2 === Object.prototype);

// Setting __proto__ to null
let obj3 = $('obj3_dunder', {});
obj3.__proto__ = $('null_for_proto', null);
$('obj3_proto_is_null', Object.getPrototypeOf(obj3) === null);
$('obj3_tostring_is_undefined', typeof obj3.toString === 'undefined');
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`val_a_dunder`, 1);
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: tmpObjLitVal };
const obj1 /*:unknown*/ = $(`obj1_dunder`, tmpCalleeParam);
const tmpObjLitVal$1 /*:unknown*/ = $(`val_b_dunder`, 2);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { b: tmpObjLitVal$1 };
const newProtoObj /*:unknown*/ = $(`opaque_new_proto_for_dunder`, tmpCalleeParam$1);
obj1.__proto__ = newProtoObj;
const tmpCalleeParam$3 /*:unknown*/ = obj1.b;
$(`obj1_b_via_dunder_proto`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = obj1.a;
$(`obj1_a_still_present`, tmpCalleeParam$5);
const tmpBinLhs /*:object*/ /*truthy*/ = $Object_getPrototypeOf(obj1);
const tmpCalleeParam$7 /*:boolean*/ = tmpBinLhs === newProtoObj;
$(`obj1_proto_is_newProto`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:object*/ /*truthy*/ = {};
const obj2 /*:unknown*/ = $(`obj2_dunder`, tmpCalleeParam$9);
const protoOfObj2 /*:unknown*/ = obj2.__proto__;
const tmpCalleeParam$11 /*:boolean*/ = protoOfObj2 === $Object_prototype;
$(`obj2_dunder_proto_is_object_prototype`, tmpCalleeParam$11);
const tmpCalleeParam$13 /*:object*/ /*truthy*/ = {};
const obj3 /*:unknown*/ = $(`obj3_dunder`, tmpCalleeParam$13);
const tmpAssignMemRhs /*:unknown*/ = $(`null_for_proto`, null);
obj3.__proto__ = tmpAssignMemRhs;
$Object_getPrototypeOf(obj3);
$(`obj3_proto_is_null`, false);
const tmpUnaryArg /*:unknown*/ = obj3.toString;
const tmpBinLhs$3 /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
const tmpCalleeParam$17 /*:boolean*/ = tmpBinLhs$3 === `undefined`;
$(`obj3_tostring_is_undefined`, tmpCalleeParam$17);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(`val_a_dunder`, 1);
const obj1 = $(`obj1_dunder`, { a: tmpObjLitVal });
const tmpObjLitVal$1 = $(`val_b_dunder`, 2);
const newProtoObj = $(`opaque_new_proto_for_dunder`, { b: tmpObjLitVal$1 });
obj1.__proto__ = newProtoObj;
$(`obj1_b_via_dunder_proto`, obj1.b);
$(`obj1_a_still_present`, obj1.a);
$(`obj1_proto_is_newProto`, $Object_getPrototypeOf(obj1) === newProtoObj);
$(`obj2_dunder_proto_is_object_prototype`, $(`obj2_dunder`, {}).__proto__ === $Object_prototype);
const obj3 = $(`obj3_dunder`, {});
obj3.__proto__ = $(`null_for_proto`, null);
$Object_getPrototypeOf(obj3);
$(`obj3_proto_is_null`, false);
const tmpUnaryArg = obj3.toString;
$(`obj3_tostring_is_undefined`, typeof tmpUnaryArg === `undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val_a_dunder", 1 );
const b = { a: a };
const c = $( "obj1_dunder", b );
const d = $( "val_b_dunder", 2 );
const e = { b: d };
const f = $( "opaque_new_proto_for_dunder", e );
c.__proto__ = f;
const g = c.b;
$( "obj1_b_via_dunder_proto", g );
const h = c.a;
$( "obj1_a_still_present", h );
const i = $Object_getPrototypeOf( c );
const j = i === f;
$( "obj1_proto_is_newProto", j );
const k = {};
const l = $( "obj2_dunder", k );
const m = l.__proto__;
const n = m === $Object_prototype;
$( "obj2_dunder_proto_is_object_prototype", n );
const o = {};
const p = $( "obj3_dunder", o );
const q = $( "null_for_proto", null );
p.__proto__ = q;
$Object_getPrototypeOf( p );
$( "obj3_proto_is_null", false );
const r = p.toString;
const s = typeof r;
const t = s === "undefined";
$( "obj3_tostring_is_undefined", t );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`val_a_dunder`, 1);
let tmpCalleeParam = { a: tmpObjLitVal };
let obj1 = $(`obj1_dunder`, tmpCalleeParam);
const tmpObjLitVal$1 = $(`val_b_dunder`, 2);
let tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
let newProtoObj = $(`opaque_new_proto_for_dunder`, tmpCalleeParam$1);
obj1.__proto__ = newProtoObj;
let tmpCalleeParam$3 = obj1.b;
$(`obj1_b_via_dunder_proto`, tmpCalleeParam$3);
let tmpCalleeParam$5 = obj1.a;
$(`obj1_a_still_present`, tmpCalleeParam$5);
const tmpMCF = $Object_getPrototypeOf;
const tmpBinLhs = $Object_getPrototypeOf(obj1);
let tmpCalleeParam$7 = tmpBinLhs === newProtoObj;
$(`obj1_proto_is_newProto`, tmpCalleeParam$7);
let tmpCalleeParam$9 = {};
let obj2 = $(`obj2_dunder`, tmpCalleeParam$9);
let protoOfObj2 = obj2.__proto__;
const tmpBinBothLhs = protoOfObj2;
const tmpBinBothRhs = $Object_prototype;
let tmpCalleeParam$11 = tmpBinBothLhs === tmpBinBothRhs;
$(`obj2_dunder_proto_is_object_prototype`, tmpCalleeParam$11);
let tmpCalleeParam$13 = {};
let obj3 = $(`obj3_dunder`, tmpCalleeParam$13);
const tmpAssignMemLhsObj = obj3;
const tmpAssignMemRhs = $(`null_for_proto`, null);
tmpAssignMemLhsObj.__proto__ = tmpAssignMemRhs;
const tmpMCF$1 = $Object_getPrototypeOf;
const tmpBinLhs$1 = $Object_getPrototypeOf(obj3);
let tmpCalleeParam$15 = tmpBinLhs$1 === null;
$(`obj3_proto_is_null`, tmpCalleeParam$15);
const tmpUnaryArg = obj3.toString;
const tmpBinLhs$3 = typeof tmpUnaryArg;
let tmpCalleeParam$17 = tmpBinLhs$3 === `undefined`;
$(`obj3_tostring_is_undefined`, tmpCalleeParam$17);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_getPrototypeOf


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val_a_dunder', 1
 - 2: 'obj1_dunder', { a: '"val_a_dunder"' }
 - 3: 'val_b_dunder', 2
 - 4: 'opaque_new_proto_for_dunder', { b: '"val_b_dunder"' }
 - 5: 'obj1_b_via_dunder_proto', undefined
 - 6: 'obj1_a_still_present', undefined
 - 7: 'obj1_proto_is_newProto', false
 - 8: 'obj2_dunder', {}
 - 9: 'obj2_dunder_proto_is_object_prototype', false
 - 10: 'obj3_dunder', {}
 - 11: 'null_for_proto', null
 - 12: 'obj3_proto_is_null', false
 - 13: 'obj3_tostring_is_undefined', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
