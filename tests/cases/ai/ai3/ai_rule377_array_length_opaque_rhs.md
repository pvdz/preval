# Preval test case

# ai_rule377_array_length_opaque_rhs.md

> Ai > Ai3 > Ai rule377 array length opaque rhs
>
> Rule 377: Assignment to array length with opaque RHS

## Input

`````js filename=intro
(function() {
  let arr1 = [1, 2, 3, 4, 5];
  arr1.length = $('new_len1', 2); // Runtime: arr1.length = "new_len1" (coerces to NaN or 0)
  $('arr1_after_len_change', JSON.stringify(arr1), arr1.length);

  let arr2 = ['a', 'b', 'c'];
  arr2.length = $('new_len2_numeric', 1);
  $('arr2_after_len_change', JSON.stringify(arr2), arr2.length);
  
  let arr3 = ['x', 'y'];
  try {
    // If opaque value becomes a string that coerces to a huge/invalid number, or negative.
    arr3.length = $('new_len3_problematic', 'invalid'); 
    $('arr3_after_problem_len', JSON.stringify(arr3), arr3.length);
  } catch (e) {
    $('arr3_error', e.name); // RangeError if length is invalid
    $('arr3_after_error', JSON.stringify(arr3), arr3.length);
  }

  let arr4 = [7, 8, 9];
  // What if $ returns a number that Preval could know?
  // Preval does not evaluate $, so it remains opaque.
  arr4.length = $('fixed_len', 1.5); // .length will be set to 1 (integer part)
  $('arr4_after_float_len', JSON.stringify(arr4), arr4.length);

  let arr5 = [10, 11];
  arr5.length = $('zero_len', 0);
  $('arr5_after_zero_len', JSON.stringify(arr5), arr5.length);
})();
`````


## Settled


`````js filename=intro
const tmpAssignMemRhs /*:unknown*/ = $(`new_len1`, 2);
const arr1 /*:array*/ = [1, 2, 3, 4, 5];
arr1.length = tmpAssignMemRhs;
const tmpCalleeParam /*:primitive*/ = $JSON_stringify(arr1);
const tmpCalleeParam$1 /*:number*/ = arr1.length;
$(`arr1_after_len_change`, tmpCalleeParam, tmpCalleeParam$1);
const tmpAssignMemRhs$1 /*:unknown*/ = $(`new_len2_numeric`, 1);
const arr2 /*:array*/ = [`a`, `b`, `c`];
arr2.length = tmpAssignMemRhs$1;
const tmpCalleeParam$3 /*:primitive*/ = $JSON_stringify(arr2);
const tmpCalleeParam$5 /*:number*/ = arr2.length;
$(`arr2_after_len_change`, tmpCalleeParam$3, tmpCalleeParam$5);
const arr3 /*:array*/ = [`x`, `y`];
try {
  const tmpAssignMemRhs$3 /*:unknown*/ = $(`new_len3_problematic`, `invalid`);
  arr3.length = tmpAssignMemRhs$3;
  const tmpCalleeParam$7 /*:primitive*/ = $JSON_stringify(arr3);
  const tmpCalleeParam$9 /*:number*/ = arr3.length;
  $(`arr3_after_problem_len`, tmpCalleeParam$7, tmpCalleeParam$9);
} catch (e) {
  const tmpCalleeParam$11 /*:unknown*/ = e.name;
  $(`arr3_error`, tmpCalleeParam$11);
  const tmpCalleeParam$13 /*:primitive*/ = $JSON_stringify(arr3);
  const tmpCalleeParam$15 /*:number*/ = arr3.length;
  $(`arr3_after_error`, tmpCalleeParam$13, tmpCalleeParam$15);
}
const tmpAssignMemRhs$5 /*:unknown*/ = $(`fixed_len`, 1.5);
const arr4 /*:array*/ = [7, 8, 9];
arr4.length = tmpAssignMemRhs$5;
const tmpCalleeParam$17 /*:primitive*/ = $JSON_stringify(arr4);
const tmpCalleeParam$19 /*:number*/ = arr4.length;
$(`arr4_after_float_len`, tmpCalleeParam$17, tmpCalleeParam$19);
const tmpAssignMemRhs$7 /*:unknown*/ = $(`zero_len`, 0);
const arr5 /*:array*/ = [10, 11];
arr5.length = tmpAssignMemRhs$7;
const tmpCalleeParam$21 /*:primitive*/ = $JSON_stringify(arr5);
const tmpCalleeParam$23 /*:number*/ = arr5.length;
$(`arr5_after_zero_len`, tmpCalleeParam$21, tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemRhs = $(`new_len1`, 2);
const arr1 = [1, 2, 3, 4, 5];
arr1.length = tmpAssignMemRhs;
$(`arr1_after_len_change`, $JSON_stringify(arr1), arr1.length);
const tmpAssignMemRhs$1 = $(`new_len2_numeric`, 1);
const arr2 = [`a`, `b`, `c`];
arr2.length = tmpAssignMemRhs$1;
$(`arr2_after_len_change`, $JSON_stringify(arr2), arr2.length);
const arr3 = [`x`, `y`];
try {
  arr3.length = $(`new_len3_problematic`, `invalid`);
  $(`arr3_after_problem_len`, $JSON_stringify(arr3), arr3.length);
} catch (e) {
  $(`arr3_error`, e.name);
  $(`arr3_after_error`, $JSON_stringify(arr3), arr3.length);
}
const tmpAssignMemRhs$5 = $(`fixed_len`, 1.5);
const arr4 = [7, 8, 9];
arr4.length = tmpAssignMemRhs$5;
$(`arr4_after_float_len`, $JSON_stringify(arr4), arr4.length);
const tmpAssignMemRhs$7 = $(`zero_len`, 0);
const arr5 = [10, 11];
arr5.length = tmpAssignMemRhs$7;
$(`arr5_after_zero_len`, $JSON_stringify(arr5), arr5.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "new_len1", 2 );
const b = [ 1, 2, 3, 4, 5 ];
b.length = a;
const c = $JSON_stringify( b );
const d = b.length;
$( "arr1_after_len_change", c, d );
const e = $( "new_len2_numeric", 1 );
const f = [ "a", "b", "c" ];
f.length = e;
const g = $JSON_stringify( f );
const h = f.length;
$( "arr2_after_len_change", g, h );
const i = [ "x", "y" ];
try {
  const j = $( "new_len3_problematic", "invalid" );
  i.length = j;
  const k = $JSON_stringify( i );
  const l = i.length;
  $( "arr3_after_problem_len", k, l );
}
catch (m) {
  const n = m.name;
  $( "arr3_error", n );
  const o = $JSON_stringify( i );
  const p = i.length;
  $( "arr3_after_error", o, p );
}
const q = $( "fixed_len", 1.5 );
const r = [ 7, 8, 9 ];
r.length = q;
const s = $JSON_stringify( r );
const t = r.length;
$( "arr4_after_float_len", s, t );
const u = $( "zero_len", 0 );
const v = [ 10, 11 ];
v.length = u;
const w = $JSON_stringify( v );
const x = v.length;
$( "arr5_after_zero_len", w, x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let arr1 = [1, 2, 3, 4, 5];
  const tmpAssignMemLhsObj = arr1;
  const tmpAssignMemRhs = $(`new_len1`, 2);
  tmpAssignMemLhsObj.length = tmpAssignMemRhs;
  const tmpMCF = $JSON_stringify;
  let tmpCalleeParam = $JSON_stringify(arr1);
  let tmpCalleeParam$1 = arr1.length;
  $(`arr1_after_len_change`, tmpCalleeParam, tmpCalleeParam$1);
  let arr2 = [`a`, `b`, `c`];
  const tmpAssignMemLhsObj$1 = arr2;
  const tmpAssignMemRhs$1 = $(`new_len2_numeric`, 1);
  tmpAssignMemLhsObj$1.length = tmpAssignMemRhs$1;
  const tmpMCF$1 = $JSON_stringify;
  let tmpCalleeParam$3 = $JSON_stringify(arr2);
  let tmpCalleeParam$5 = arr2.length;
  $(`arr2_after_len_change`, tmpCalleeParam$3, tmpCalleeParam$5);
  let arr3 = [`x`, `y`];
  try {
    const tmpAssignMemLhsObj$3 = arr3;
    const tmpAssignMemRhs$3 = $(`new_len3_problematic`, `invalid`);
    tmpAssignMemLhsObj$3.length = tmpAssignMemRhs$3;
    const tmpMCF$3 = $JSON_stringify;
    let tmpCalleeParam$7 = $JSON_stringify(arr3);
    let tmpCalleeParam$9 = arr3.length;
    $(`arr3_after_problem_len`, tmpCalleeParam$7, tmpCalleeParam$9);
  } catch (e) {
    let tmpCalleeParam$11 = e.name;
    $(`arr3_error`, tmpCalleeParam$11);
    const tmpMCF$5 = $JSON_stringify;
    let tmpCalleeParam$13 = $JSON_stringify(arr3);
    let tmpCalleeParam$15 = arr3.length;
    $(`arr3_after_error`, tmpCalleeParam$13, tmpCalleeParam$15);
  }
  let arr4 = [7, 8, 9];
  const tmpAssignMemLhsObj$5 = arr4;
  const tmpAssignMemRhs$5 = $(`fixed_len`, 1.5);
  tmpAssignMemLhsObj$5.length = tmpAssignMemRhs$5;
  const tmpMCF$7 = $JSON_stringify;
  let tmpCalleeParam$17 = $JSON_stringify(arr4);
  let tmpCalleeParam$19 = arr4.length;
  $(`arr4_after_float_len`, tmpCalleeParam$17, tmpCalleeParam$19);
  let arr5 = [10, 11];
  const tmpAssignMemLhsObj$7 = arr5;
  const tmpAssignMemRhs$7 = $(`zero_len`, 0);
  tmpAssignMemLhsObj$7.length = tmpAssignMemRhs$7;
  const tmpMCF$9 = $JSON_stringify;
  let tmpCalleeParam$21 = $JSON_stringify(arr5);
  let tmpCalleeParam$23 = arr5.length;
  $(`arr5_after_zero_len`, tmpCalleeParam$21, tmpCalleeParam$23);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $JSON_stringify


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'new_len1', 2
 - eval returned: ('<crash[ Invalid array length ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
