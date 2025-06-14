# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Logic and both > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) && ([b] = $([$(2)]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const b /*:unknown*/ = tmpArrPatternSplat[0];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpNestedAssignArrPatternRhs) {
  const tmpArrElement$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement$1];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat$1[0];
  $(a, tmpClusterSSA_b);
} else {
  $(a, b);
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
  const tmpArrElement$1 = $(2);
  const tmpArrAssignPatternRhs = $([tmpArrElement$1]);
  $(a, [...tmpArrAssignPatternRhs][0]);
} else {
  $(a, b);
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
  const g = $( 2 );
  const h = [ g ];
  const i = $( h );
  const j = [ ...i ];
  const k = j[ 0 ];
  $( f, k );
}
else {
  $( f, e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpArrElement = $(2);
let tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = tmpArrPatternSplat[0];
tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
  const tmpArrElement$1 = $(2);
  let tmpCalleeParam$1 = [tmpArrElement$1];
  const tmpArrAssignPatternRhs = $(tmpCalleeParam$1);
  const tmpArrPatternSplat$1 = [...tmpArrAssignPatternRhs];
  b = tmpArrPatternSplat$1[0];
  $(a, b);
} else {
  $(a, b);
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
 - 3: 2
 - 4: [2]
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
