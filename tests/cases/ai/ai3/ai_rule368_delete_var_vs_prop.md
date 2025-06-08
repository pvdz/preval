# Preval test case

# ai_rule368_delete_var_vs_prop.md

> Ai > Ai3 > Ai rule368 delete var vs prop
>
> Rule 368: Delete operator behavior (Strict Mode Compatible)

## Input

`````js filename=intro
(function() {
  let obj = { p: $('p_val', 20) };
  let opaquePropName = $('prop_name', 'p');

  // Test 1: Deleting an object property with an opaque name
  let res1 = delete obj[opaquePropName];
  $('res1_delete_obj_prop', res1, typeof obj.p, opaquePropName in obj);
  obj.p = $('p_val_restored', 20); // Restore

  // Test 2: Deleting the result of an opaque call
  let res2 = delete $('some_opaque_val');
  $('res2_delete_opaque', res2);

  // // Test 3: Deleting a configurable property of the global object
  // globalThis.explicitGlobalVar = $('global_val', 30);
  // $('globalVar_before_delete', typeof globalThis.explicitGlobalVar);
  // let res3 = delete globalThis.explicitGlobalVar;
  // $('res3_delete_global_prop', res3, typeof globalThis.explicitGlobalVar);
  
  // // Test 4: Attempting to delete a non-configurable global property (e.g., NaN)
  // // Note: `delete NaN` is a SyntaxError. Must access as property of globalThis.
  // let res4 = delete globalThis.NaN; 
  // $('res4_delete_NaN', res4, typeof globalThis.NaN);

  // // Test 5: Attempting to delete another non-configurable global property (e.g., undefined)
  // let res5 = delete globalThis.undefined;
  // $('res5_delete_undefined', res5, typeof globalThis.undefined);
})();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`p_val`, 20);
const opaquePropName /*:unknown*/ = $(`prop_name`, `p`);
const obj /*:object*/ /*truthy*/ = { p: tmpObjLitVal };
const res1 /*:boolean*/ = delete obj[opaquePropName];
const tmpUnaryArg /*:unknown*/ = obj.p;
const tmpCalleeParam$1 /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
const tmpCalleeParam$3 /*:boolean*/ = opaquePropName in obj;
$(`res1_delete_obj_prop`, res1, tmpCalleeParam$1, tmpCalleeParam$3);
const tmpAssignMemRhs /*:unknown*/ = $(`p_val_restored`, 20);
obj.p = tmpAssignMemRhs;
$(`some_opaque_val`);
$(`res2_delete_opaque`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(`p_val`, 20);
const opaquePropName = $(`prop_name`, `p`);
const obj = { p: tmpObjLitVal };
const res1 = delete obj[opaquePropName];
const tmpUnaryArg = obj.p;
$(`res1_delete_obj_prop`, res1, typeof tmpUnaryArg, opaquePropName in obj);
obj.p = $(`p_val_restored`, 20);
$(`some_opaque_val`);
$(`res2_delete_opaque`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "p_val", 20 );
const b = $( "prop_name", "p" );
const c = { p: a };
const d = delete c[ b ];
const e = c.p;
const f = typeof e;
const g = b in c;
$( "res1_delete_obj_prop", d, f, g );
const h = $( "p_val_restored", 20 );
c.p = h;
$( "some_opaque_val" );
$( "res2_delete_opaque", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  const tmpObjLitVal = $(`p_val`, 20);
  let obj = { p: tmpObjLitVal };
  let opaquePropName = $(`prop_name`, `p`);
  let res1 = delete obj[opaquePropName];
  let tmpCalleeParam = res1;
  const tmpUnaryArg = obj.p;
  let tmpCalleeParam$1 = typeof tmpUnaryArg;
  let tmpCalleeParam$3 = opaquePropName in obj;
  $(`res1_delete_obj_prop`, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  const tmpAssignMemLhsObj = obj;
  const tmpAssignMemRhs = $(`p_val_restored`, 20);
  tmpAssignMemLhsObj.p = tmpAssignMemRhs;
  $(`some_opaque_val`);
  let res2 = true;
  $(`res2_delete_opaque`, res2);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'p_val', 20
 - 2: 'prop_name', 'p'
 - 3: 'res1_delete_obj_prop', true, 'string', false
 - 4: 'p_val_restored', 20
 - 5: 'some_opaque_val'
 - 6: 'res2_delete_opaque', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
