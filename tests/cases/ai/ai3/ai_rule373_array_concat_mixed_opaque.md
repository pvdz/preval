# Preval test case

# ai_rule373_array_concat_mixed_opaque.md

> Ai > Ai3 > Ai rule373 array concat mixed opaque
>
> Rule 373: Array.prototype.concat with mixed opaque/non-opaque args

## Input

`````js filename=intro
(function() {
  let arr1 = [1, 2];
  let opaqueArr = $('get_opaque_arr', [3, 4]);
  let opaqueVal = $('get_opaque_val', 5);
  let arr2 = [6, 7];

  // Test 1: All non-opaque
  let res1 = arr1.concat(arr2, [8,9]);
  $('res1', JSON.stringify(res1)); // [1,2,6,7,8,9]

  // Test 2: Mixed, opaque array in middle
  let res2 = arr1.concat(opaqueArr, arr2);
  $('res2', JSON.stringify(res2)); // Runtime: [1,2, "get_opaque_arr", 6,7]

  // Test 3: Mixed, opaque value (not array) in middle
  let res3 = arr1.concat(opaqueVal, arr2);
  $('res3', JSON.stringify(res3)); // Runtime: [1,2, "get_opaque_val", 6,7]

  // Test 4: Opaque array as `this` arg, with non-opaque args
  try {
    let res4 = Array.prototype.concat.call(opaqueArr, arr1, opaqueVal);
    $('res4', JSON.stringify(res4)); // Runtime: ["g","e","t","_","o", ... ,1,2, "get_opaque_val"]
  } catch (e) {
    $('res4_error', e.name); // If opaqueArr is not array-like or concat fails
  }
  
  // Test 5: Opaque array, opaque value
  let res5 = arr1.concat(opaqueArr, opaqueVal, arr2, $('another_opaque', [10,11]));
  $('res5', JSON.stringify(res5));

})();
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [3, 4];
const opaqueArr /*:unknown*/ = $(`get_opaque_arr`, tmpCalleeParam);
const opaqueVal /*:unknown*/ = $(`get_opaque_val`, 5);
const arr1 /*:array*/ /*truthy*/ = [1, 2];
const arr2 /*:array*/ /*truthy*/ = [6, 7];
const tmpMCP /*:array*/ /*truthy*/ = [8, 9];
const res1 /*:array*/ /*truthy*/ = $dotCall($array_concat, arr1, `concat`, arr2, tmpMCP);
const tmpCalleeParam$1 /*:primitive*/ = $JSON_stringify(res1);
$(`res1`, tmpCalleeParam$1);
const res2 /*:array*/ /*truthy*/ = $dotCall($array_concat, arr1, `concat`, opaqueArr, arr2);
const tmpCalleeParam$3 /*:primitive*/ = $JSON_stringify(res2);
$(`res2`, tmpCalleeParam$3);
const res3 /*:array*/ /*truthy*/ = $dotCall($array_concat, arr1, `concat`, opaqueVal, arr2);
const tmpCalleeParam$5 /*:primitive*/ = $JSON_stringify(res3);
$(`res3`, tmpCalleeParam$5);
try {
  const res4 /*:array*/ /*truthy*/ = $dotCall($array_concat, opaqueArr, undefined, arr1, opaqueVal);
  const tmpCalleeParam$7 /*:primitive*/ = $JSON_stringify(res4);
  $(`res4`, tmpCalleeParam$7);
} catch (e) {
  const tmpCalleeParam$9 /*:unknown*/ = e.name;
  $(`res4_error`, tmpCalleeParam$9);
}
const tmpCalleeParam$11 /*:array*/ /*truthy*/ = [10, 11];
const tmpMCP$1 /*:unknown*/ = $(`another_opaque`, tmpCalleeParam$11);
const res5 /*:array*/ /*truthy*/ = $dotCall($array_concat, arr1, `concat`, opaqueArr, opaqueVal, arr2, tmpMCP$1);
const tmpCalleeParam$13 /*:primitive*/ = $JSON_stringify(res5);
$(`res5`, tmpCalleeParam$13);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const opaqueArr = $(`get_opaque_arr`, [3, 4]);
const opaqueVal = $(`get_opaque_val`, 5);
const arr1 = [1, 2];
const arr2 = [6, 7];
$(`res1`, $JSON_stringify($dotCall($array_concat, arr1, `concat`, arr2, [8, 9])));
$(`res2`, $JSON_stringify($dotCall($array_concat, arr1, `concat`, opaqueArr, arr2)));
$(`res3`, $JSON_stringify($dotCall($array_concat, arr1, `concat`, opaqueVal, arr2)));
try {
  $(`res4`, $JSON_stringify($dotCall($array_concat, opaqueArr, undefined, arr1, opaqueVal)));
} catch (e) {
  $(`res4_error`, e.name);
}
$(`res5`, $JSON_stringify($dotCall($array_concat, arr1, `concat`, opaqueArr, opaqueVal, arr2, $(`another_opaque`, [10, 11]))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 4 ];
const b = $( "get_opaque_arr", a );
const c = $( "get_opaque_val", 5 );
const d = [ 1, 2 ];
const e = [ 6, 7 ];
const f = [ 8, 9 ];
const g = $dotCall( $array_concat, d, "concat", e, f );
const h = $JSON_stringify( g );
$( "res1", h );
const i = $dotCall( $array_concat, d, "concat", b, e );
const j = $JSON_stringify( i );
$( "res2", j );
const k = $dotCall( $array_concat, d, "concat", c, e );
const l = $JSON_stringify( k );
$( "res3", l );
try {
  const m = $dotCall( $array_concat, b, undefined, d, c );
  const n = $JSON_stringify( m );
  $( "res4", n );
}
catch (o) {
  const p = o.name;
  $( "res4_error", p );
}
const q = [ 10, 11 ];
const r = $( "another_opaque", q );
const s = $dotCall( $array_concat, d, "concat", b, c, e, r );
const t = $JSON_stringify( s );
$( "res5", t );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let arr1 = [1, 2];
  let tmpCalleeParam = [3, 4];
  let opaqueArr = $(`get_opaque_arr`, tmpCalleeParam);
  let opaqueVal = $(`get_opaque_val`, 5);
  let arr2 = [6, 7];
  const tmpMCF = arr1.concat;
  const tmpMCP = [8, 9];
  let res1 = $dotCall(tmpMCF, arr1, `concat`, arr2, tmpMCP);
  const tmpMCF$1 = $JSON_stringify;
  let tmpCalleeParam$1 = $JSON_stringify(res1);
  $(`res1`, tmpCalleeParam$1);
  const tmpMCF$3 = arr1.concat;
  let res2 = $dotCall(tmpMCF$3, arr1, `concat`, opaqueArr, arr2);
  const tmpMCF$5 = $JSON_stringify;
  let tmpCalleeParam$3 = $JSON_stringify(res2);
  $(`res2`, tmpCalleeParam$3);
  const tmpMCF$7 = arr1.concat;
  let res3 = $dotCall(tmpMCF$7, arr1, `concat`, opaqueVal, arr2);
  const tmpMCF$9 = $JSON_stringify;
  let tmpCalleeParam$5 = $JSON_stringify(res3);
  $(`res3`, tmpCalleeParam$5);
  try {
    const tmpCompObj = $Array_prototype;
    const tmpMCOO = tmpCompObj.concat;
    const tmpMCF$11 = tmpMCOO.call;
    let res4 = $dotCall(tmpMCF$11, tmpMCOO, `call`, opaqueArr, arr1, opaqueVal);
    const tmpMCF$13 = $JSON_stringify;
    let tmpCalleeParam$7 = $JSON_stringify(res4);
    $(`res4`, tmpCalleeParam$7);
  } catch (e) {
    let tmpCalleeParam$9 = e.name;
    $(`res4_error`, tmpCalleeParam$9);
  }
  const tmpMCF$15 = arr1.concat;
  let tmpCalleeParam$11 = [10, 11];
  const tmpMCP$1 = $(`another_opaque`, tmpCalleeParam$11);
  let res5 = $dotCall(tmpMCF$15, arr1, `concat`, opaqueArr, opaqueVal, arr2, tmpMCP$1);
  const tmpMCF$17 = $JSON_stringify;
  let tmpCalleeParam$13 = $JSON_stringify(res5);
  $(`res5`, tmpCalleeParam$13);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_concat
- (todo) access object property that also exists on prototype? $function_call
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) array reads var statement with init CallExpression
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) try escaping may support dotcalling $array_concat
- (todo) type trackeed tricks can possibly support static $JSON_stringify


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_opaque_arr', [3, 4]
 - 2: 'get_opaque_val', 5
 - 3: 'res1', '[1,2,6,7,8,9]'
 - 4: 'res2', '[1,2,"get_opaque_arr",6,7]'
 - 5: 'res3', '[1,2,"get_opaque_val",6,7]'
 - 6: 'res4', '["get_opaque_arr",1,2,"get_opaque_val"]'
 - 7: 'another_opaque', [10, 11]
 - 8: 'res5', '[1,2,"get_opaque_arr","get_opaque_val",6,7,"another_opaque"]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
