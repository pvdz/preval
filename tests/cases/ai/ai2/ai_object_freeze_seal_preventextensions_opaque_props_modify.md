# Preval test case

# ai_object_freeze_seal_preventextensions_opaque_props_modify.md

> Ai > Ai2 > Ai object freeze seal preventextensions opaque props modify
>
> Test: freeze/seal/preventExtensions on obj with opaque props, then try opaque mods.

## Input

`````js filename=intro
// Expected: Modifications fail silently or throw (strict) as per spec. Preval should preserve the integrity calls.
function testIntegrity(objName, obj, opaqKeyName, opaqKeyVal, opaqNewVal, opaqNewPropName, opaqNewPropVal) {
  let key = $(opaqKeyName, opaqKeyVal);
  let newVal = $(opaqNewVal);
  let newPropName = $(opaqNewPropName, 'newDynamicProp');
  let newPropVal = $(opaqNewPropVal);
  let initialVal = obj[key];

  // Modify existing prop
  try { obj[key] = newVal; } catch (e) { $(objName + '_mod_err', e.name); }
  $(objName + '_after_mod', obj[key], initialVal === obj[key]); // Check if value changed

  // Add new prop
  try { obj[newPropName] = newPropVal; } catch (e) { $(objName + '_add_err', e.name); }
  $(objName + '_after_add', obj.hasOwnProperty(newPropName));

  // Delete existing prop
  let canDelete = true;
  try { canDelete = delete obj[key]; } catch (e) { $(objName + '_del_err', e.name); canDelete = false; }
  $(objName + '_after_del', !obj.hasOwnProperty(key), canDelete);
}

let o1_val = $('o1_val', 'val1');
let o1 = { p: o1_val };
Object.preventExtensions(o1);
$(o1.p === o1_val); // Initial check
testIntegrity('o1_preventExt', o1, 'o1_key_p', 'p', 'o1_new_val_p', 'o1_new_prop', 'o1_new_prop_val');

let o2_val = $('o2_val', 'val2');
let o2 = { p: o2_val };
Object.seal(o2);
$(o2.p === o2_val);
testIntegrity('o2_seal', o2, 'o2_key_p', 'p', 'o2_new_val_p', 'o2_new_prop', 'o2_new_prop_val');

let o3_val = $('o3_val', 'val3');
let o3 = { p: o3_val };
Object.freeze(o3);
$(o3.p === o3_val);
testIntegrity('o3_freeze', o3, 'o3_key_p', 'p', 'o3_new_val_p', 'o3_new_prop', 'o3_new_prop_val');
`````


## Settled


`````js filename=intro
const testIntegrity /*:(string, object, string, string, string, string)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4, $$5) {
  const objName$1 /*:string*/ = $$0;
  const obj /*:object*/ = $$1;
  const opaqKeyName /*:string*/ = $$2;
  const opaqNewVal /*:string*/ = $$3;
  const opaqNewPropName /*:string*/ = $$4;
  const opaqNewPropVal /*:string*/ = $$5;
  debugger;
  const key /*:unknown*/ = $(opaqKeyName, `p`);
  const newVal /*:unknown*/ = $(opaqNewVal);
  const newPropName /*:unknown*/ = $(opaqNewPropName, `newDynamicProp`);
  const newPropVal /*:unknown*/ = $(opaqNewPropVal);
  const initialVal /*:unknown*/ = obj[key];
  try {
    obj[key] = newVal;
  } catch (e) {
    const tmpCalleeParam$1 /*:unknown*/ = e.name;
    const tmpCalleeParam /*:string*/ = `${objName$1}_mod_err`;
    $(tmpCalleeParam, tmpCalleeParam$1);
  }
  const tmpCalleeParam$5 /*:unknown*/ = obj[key];
  const tmpBinBothRhs /*:unknown*/ = obj[key];
  const tmpCalleeParam$3 /*:string*/ = `${objName$1}_after_mod`;
  const tmpCalleeParam$7 /*:boolean*/ = initialVal === tmpBinBothRhs;
  $(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  try {
    obj[newPropName] = newPropVal;
  } catch (e$1) {
    const tmpCalleeParam$11 /*:unknown*/ = e$1.name;
    const tmpCalleeParam$9 /*:string*/ = `${objName$1}_add_err`;
    $(tmpCalleeParam$9, tmpCalleeParam$11);
  }
  const tmpMCF /*:unknown*/ = obj.hasOwnProperty;
  const tmpCalleeParam$15 /*:unknown*/ = $dotCall(tmpMCF, obj, `hasOwnProperty`, newPropName);
  const tmpCalleeParam$13 /*:string*/ = `${objName$1}_after_add`;
  $(tmpCalleeParam$13, tmpCalleeParam$15);
  let canDelete$1 /*:boolean*/ = false;
  try {
    canDelete$1 = delete obj[key];
  } catch (e$3) {
    const tmpCalleeParam$19 /*:unknown*/ = e$3.name;
    const tmpCalleeParam$17 /*:string*/ = `${objName$1}_del_err`;
    $(tmpCalleeParam$17, tmpCalleeParam$19);
  }
  const tmpMCF$1 /*:unknown*/ = obj.hasOwnProperty;
  const tmpUnaryArg /*:unknown*/ = $dotCall(tmpMCF$1, obj, `hasOwnProperty`, key);
  const tmpCalleeParam$21 /*:string*/ = `${objName$1}_after_del`;
  const tmpCalleeParam$23 /*:boolean*/ = !tmpUnaryArg;
  $(tmpCalleeParam$21, tmpCalleeParam$23, canDelete$1);
  return undefined;
};
const o1_val /*:unknown*/ = $(`o1_val`, `val1`);
const o1 /*:object*/ = { p: o1_val };
$Object_preventExtensions(o1);
const tmpBinLhs /*:unknown*/ = o1.p;
const tmpCalleeParam$27 /*:boolean*/ = tmpBinLhs === o1_val;
$(tmpCalleeParam$27);
testIntegrity(`o1_preventExt`, o1, `o1_key_p`, `o1_new_val_p`, `o1_new_prop`, `o1_new_prop_val`);
const o2_val /*:unknown*/ = $(`o2_val`, `val2`);
const o2 /*:object*/ = { p: o2_val };
$Object_seal(o2);
const tmpBinLhs$1 /*:unknown*/ = o2.p;
const tmpCalleeParam$29 /*:boolean*/ = tmpBinLhs$1 === o2_val;
$(tmpCalleeParam$29);
testIntegrity(`o2_seal`, o2, `o2_key_p`, `o2_new_val_p`, `o2_new_prop`, `o2_new_prop_val`);
const o3_val /*:unknown*/ = $(`o3_val`, `val3`);
const o3 /*:object*/ = { p: o3_val };
$Object_freeze(o3);
const tmpBinLhs$3 /*:unknown*/ = o3.p;
const tmpCalleeParam$31 /*:boolean*/ = tmpBinLhs$3 === o3_val;
$(tmpCalleeParam$31);
testIntegrity(`o3_freeze`, o3, `o3_key_p`, `o3_new_val_p`, `o3_new_prop`, `o3_new_prop_val`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testIntegrity = function (objName$1, obj, opaqKeyName, opaqNewVal, opaqNewPropName, opaqNewPropVal) {
  const key = $(opaqKeyName, `p`);
  const newVal = $(opaqNewVal);
  const newPropName = $(opaqNewPropName, `newDynamicProp`);
  const newPropVal = $(opaqNewPropVal);
  const initialVal = obj[key];
  try {
    obj[key] = newVal;
  } catch (e) {
    const tmpCalleeParam$1 = e.name;
    $(`${objName$1}_mod_err`, tmpCalleeParam$1);
  }
  const tmpCalleeParam$5 = obj[key];
  const tmpBinBothRhs = obj[key];
  $(`${objName$1}_after_mod`, tmpCalleeParam$5, initialVal === tmpBinBothRhs);
  try {
    obj[newPropName] = newPropVal;
  } catch (e$1) {
    const tmpCalleeParam$11 = e$1.name;
    $(`${objName$1}_add_err`, tmpCalleeParam$11);
  }
  const tmpCalleeParam$15 = obj.hasOwnProperty(newPropName);
  $(`${objName$1}_after_add`, tmpCalleeParam$15);
  let canDelete$1 = false;
  try {
    canDelete$1 = delete obj[key];
  } catch (e$3) {
    const tmpCalleeParam$19 = e$3.name;
    $(`${objName$1}_del_err`, tmpCalleeParam$19);
  }
  const tmpUnaryArg = obj.hasOwnProperty(key);
  $(`${objName$1}_after_del`, !tmpUnaryArg, canDelete$1);
};
const o1_val = $(`o1_val`, `val1`);
const o1 = { p: o1_val };
$Object_preventExtensions(o1);
$(o1.p === o1_val);
testIntegrity(`o1_preventExt`, o1, `o1_key_p`, `o1_new_val_p`, `o1_new_prop`, `o1_new_prop_val`);
const o2_val = $(`o2_val`, `val2`);
const o2 = { p: o2_val };
$Object_seal(o2);
$(o2.p === o2_val);
testIntegrity(`o2_seal`, o2, `o2_key_p`, `o2_new_val_p`, `o2_new_prop`, `o2_new_prop_val`);
const o3_val = $(`o3_val`, `val3`);
const o3 = { p: o3_val };
$Object_freeze(o3);
$(o3.p === o3_val);
testIntegrity(`o3_freeze`, o3, `o3_key_p`, `o3_new_val_p`, `o3_new_prop`, `o3_new_prop_val`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3,$$4,$$5 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  const e = $$3;
  const f = $$4;
  const g = $$5;
  debugger;
  const h = $( d, "p" );
  const i = $( e );
  const j = $( f, "newDynamicProp" );
  const k = $( g );
  const l = c[ h ];
  try {
    c[h] = i;
  }
  catch (m) {
    const n = m.name;
    const o = `${b}_mod_err`;
    $( o, n );
  }
  const p = c[ h ];
  const q = c[ h ];
  const r = `${b}_after_mod`;
  const s = l === q;
  $( r, p, s );
  try {
    c[j] = k;
  }
  catch (t) {
    const u = t.name;
    const v = `${b}_add_err`;
    $( v, u );
  }
  const w = c.hasOwnProperty;
  const x = $dotCall( w, c, "hasOwnProperty", j );
  const y = `${b}_after_add`;
  $( y, x );
  let z = false;
  try {
    z = delete c[ h ];
  }
  catch (ba) {
    const bb = ba.name;
    const bc = `${b}_del_err`;
    $( bc, bb );
  }
  const bd = c.hasOwnProperty;
  const be = $dotCall( bd, c, "hasOwnProperty", h );
  const bf = `${b}_after_del`;
  const bg = !be;
  $( bf, bg, z );
  return undefined;
};
const bh = $( "o1_val", "val1" );
const bi = { p: bh };
$Object_preventExtensions( bi );
const bj = bi.p;
const bk = bj === bh;
$( bk );
a( "o1_preventExt", bi, "o1_key_p", "o1_new_val_p", "o1_new_prop", "o1_new_prop_val" );
const bl = $( "o2_val", "val2" );
const bm = { p: bl };
$Object_seal( bm );
const bn = bm.p;
const bo = bn === bl;
$( bo );
a( "o2_seal", bm, "o2_key_p", "o2_new_val_p", "o2_new_prop", "o2_new_prop_val" );
const bp = $( "o3_val", "val3" );
const bq = { p: bp };
$Object_freeze( bq );
const br = bq.p;
const bs = br === bp;
$( bs );
a( "o3_freeze", bq, "o3_key_p", "o3_new_val_p", "o3_new_prop", "o3_new_prop_val" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testIntegrity = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
  let objName = $$0;
  let obj = $$1;
  let opaqKeyName = $$2;
  let opaqKeyVal = $$3;
  let opaqNewVal = $$4;
  let opaqNewPropName = $$5;
  let opaqNewPropVal = $$6;
  debugger;
  let key = $(opaqKeyName, opaqKeyVal);
  let newVal = $(opaqNewVal);
  let newPropName = $(opaqNewPropName, `newDynamicProp`);
  let newPropVal = $(opaqNewPropVal);
  let initialVal = obj[key];
  try {
    obj[key] = newVal;
  } catch (e) {
    const tmpStringConcatR = $coerce(objName, `plustr`);
    let tmpCalleeParam = `${tmpStringConcatR}_mod_err`;
    let tmpCalleeParam$1 = e.name;
    $(tmpCalleeParam, tmpCalleeParam$1);
  }
  const tmpStringConcatR$1 = $coerce(objName, `plustr`);
  let tmpCalleeParam$3 = `${tmpStringConcatR$1}_after_mod`;
  let tmpCalleeParam$5 = obj[key];
  const tmpBinBothLhs = initialVal;
  const tmpBinBothRhs = obj[key];
  let tmpCalleeParam$7 = tmpBinBothLhs === tmpBinBothRhs;
  $(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  try {
    obj[newPropName] = newPropVal;
  } catch (e$1) {
    const tmpStringConcatR$3 = $coerce(objName, `plustr`);
    let tmpCalleeParam$9 = `${tmpStringConcatR$3}_add_err`;
    let tmpCalleeParam$11 = e$1.name;
    $(tmpCalleeParam$9, tmpCalleeParam$11);
  }
  const tmpStringConcatR$5 = $coerce(objName, `plustr`);
  let tmpCalleeParam$13 = `${tmpStringConcatR$5}_after_add`;
  const tmpMCF = obj.hasOwnProperty;
  let tmpCalleeParam$15 = $dotCall(tmpMCF, obj, `hasOwnProperty`, newPropName);
  $(tmpCalleeParam$13, tmpCalleeParam$15);
  let canDelete = true;
  try {
    canDelete = delete obj[key];
  } catch (e$3) {
    const tmpStringConcatR$7 = $coerce(objName, `plustr`);
    let tmpCalleeParam$17 = `${tmpStringConcatR$7}_del_err`;
    let tmpCalleeParam$19 = e$3.name;
    $(tmpCalleeParam$17, tmpCalleeParam$19);
    canDelete = false;
  }
  const tmpStringConcatR$9 = $coerce(objName, `plustr`);
  let tmpCalleeParam$21 = `${tmpStringConcatR$9}_after_del`;
  const tmpMCF$1 = obj.hasOwnProperty;
  const tmpUnaryArg = $dotCall(tmpMCF$1, obj, `hasOwnProperty`, key);
  let tmpCalleeParam$23 = !tmpUnaryArg;
  let tmpCalleeParam$25 = canDelete;
  $(tmpCalleeParam$21, tmpCalleeParam$23, canDelete);
  return undefined;
};
let o1_val = $(`o1_val`, `val1`);
let o1 = { p: o1_val };
const tmpMCF$3 = $Object_preventExtensions;
$Object_preventExtensions(o1);
const tmpBinLhs = o1.p;
let tmpCalleeParam$27 = tmpBinLhs === o1_val;
$(tmpCalleeParam$27);
testIntegrity(`o1_preventExt`, o1, `o1_key_p`, `p`, `o1_new_val_p`, `o1_new_prop`, `o1_new_prop_val`);
let o2_val = $(`o2_val`, `val2`);
let o2 = { p: o2_val };
const tmpMCF$5 = $Object_seal;
$Object_seal(o2);
const tmpBinLhs$1 = o2.p;
let tmpCalleeParam$29 = tmpBinLhs$1 === o2_val;
$(tmpCalleeParam$29);
testIntegrity(`o2_seal`, o2, `o2_key_p`, `p`, `o2_new_val_p`, `o2_new_prop`, `o2_new_prop_val`);
let o3_val = $(`o3_val`, `val3`);
let o3 = { p: o3_val };
const tmpMCF$7 = $Object_freeze;
$Object_freeze(o3);
const tmpBinLhs$3 = o3.p;
let tmpCalleeParam$31 = tmpBinLhs$3 === o3_val;
$(tmpCalleeParam$31);
testIntegrity(`o3_freeze`, o3, `o3_key_p`, `p`, `o3_new_val_p`, `o3_new_prop`, `o3_new_prop_val`);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $object_hasOwnProperty
- (todo) type trackeed tricks can possibly support static $Object_freeze
- (todo) type trackeed tricks can possibly support static $Object_preventExtensions
- (todo) type trackeed tricks can possibly support static $Object_seal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'o1_val', 'val1'
 - 2: true
 - 3: 'o1_key_p', 'p'
 - 4: 'o1_new_val_p'
 - 5: 'o1_new_prop', 'newDynamicProp'
 - 6: 'o1_new_prop_val'
 - 7: 'o1_preventExt_mod_err', 'TypeError'
 - 8: 'o1_preventExt_after_mod', undefined, true
 - 9: 'o1_preventExt_add_err', 'TypeError'
 - 10: 'o1_preventExt_after_add', false
 - 11: 'o1_preventExt_after_del', true, true
 - 12: 'o2_val', 'val2'
 - 13: true
 - 14: 'o2_key_p', 'p'
 - 15: 'o2_new_val_p'
 - 16: 'o2_new_prop', 'newDynamicProp'
 - 17: 'o2_new_prop_val'
 - 18: 'o2_seal_mod_err', 'TypeError'
 - 19: 'o2_seal_after_mod', undefined, true
 - 20: 'o2_seal_add_err', 'TypeError'
 - 21: 'o2_seal_after_add', false
 - 22: 'o2_seal_after_del', true, true
 - 23: 'o3_val', 'val3'
 - 24: true
 - 25: 'o3_key_p', 'p'
 - 26: 'o3_new_val_p'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
