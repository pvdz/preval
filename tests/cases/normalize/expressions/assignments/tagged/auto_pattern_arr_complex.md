# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${([a] = $([1, 2]))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpNestedAssignArrPatternRhs = $([1, 2]);
const a = [...tmpNestedAssignArrPatternRhs][0];
$([`before `, ` after`], tmpNestedAssignArrPatternRhs);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
const b = [ 1, 2 ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = [ "before ", " after" ];
$( f, c );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
let tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = tmpArrPatternSplat$1[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
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
