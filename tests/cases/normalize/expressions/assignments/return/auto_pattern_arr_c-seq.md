# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Return > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
function f() {
  return ([a] = ($(10), $(20), $([1, 2])));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
$(tmpNestedAssignArrPatternRhs);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
$( 10 );
$( 20 );
const b = [ 1, 2 ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( c );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  $(10);
  $(20);
  let tmpCalleeParam = [1, 2];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  a = tmpArrPatternSplat[0];
  tmpReturnArg = tmpNestedAssignArrPatternRhs;
  return tmpReturnArg;
};
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat$1 = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat$1[0];
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
