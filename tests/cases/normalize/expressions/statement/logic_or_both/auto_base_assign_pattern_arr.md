# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Logic or both > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) || ([b] = $([$(2)]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const b /*:unknown*/ = tmpArrPatternSplat[0];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpNestedAssignArrPatternRhs) {
  $(a, b);
} else {
  const tmpArrElement$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrAssignPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat$1[0];
  $(a, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const b = [...tmpNestedAssignArrPatternRhs][0];
const a = { a: 999, b: 1000 };
if (tmpNestedAssignArrPatternRhs) {
  $(a, b);
} else {
  const tmpArrElement$1 = $(2);
  const tmpArrAssignPatternRhs = $([tmpArrElement$1]);
  $(a, [...tmpArrAssignPatternRhs][0]);
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
const f = {
  a: 999,
  b: 1000,
};
if (c) {
  $( f, e );
}
else {
  const g = $( 2 );
  const h = [ g ];
  const i = $( h );
  const j = [ ...i ];
  const k = j[ 0 ];
  $( f, k );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
