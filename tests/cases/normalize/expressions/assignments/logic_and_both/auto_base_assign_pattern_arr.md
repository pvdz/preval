# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Logic and both > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) && (a = [b] = $([$(2)])));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const b /*:unknown*/ = tmpArrPatternSplat[0];
if (tmpNestedAssignArrPatternRhs) {
  const tmpArrElement$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs$1];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat$1[0];
  $(tmpNestedAssignArrPatternRhs$1);
  $(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_b);
} else {
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const b = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  const tmpArrElement$1 = $(2);
  const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
  const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs$1][0];
  $(tmpNestedAssignArrPatternRhs$1);
  $(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_b);
} else {
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
if (c) {
  const f = $( 2 );
  const g = [ f ];
  const h = $( g );
  const i = [ ...h ];
  const j = i[ 0 ];
  $( h );
  $( h, j );
}
else {
  $( c );
  $( c, e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
let tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = tmpArrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpArrElement$1 = $(2);
  let tmpCalleeParam$3 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
  const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  b = tmpArrPatternSplat$1[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  $(tmpCalleeParam);
  $(a, b);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: [2]
 - 6: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
