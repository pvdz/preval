# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Switch case block > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = [b] = $([$(2)]);
  }
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  const b /*:array*/ /*truthy*/ = [];
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpArrElement = $(2);
  const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
  $(tmpNestedAssignArrPatternRhs, [...tmpNestedAssignArrPatternRhs][0]);
} else {
  $({ a: 999, b: 1000 }, []);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = $( 2 );
  const e = [ d ];
  const f = $( e );
  const g = [ ...f ];
  const h = g[ 0 ];
  $( f, h );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  const j = [];
  $( i, j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpArrElement = $(2);
  let tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = tmpArrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs, b);
} else {
  $(a, b);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: [2]
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
