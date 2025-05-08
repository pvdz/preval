# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Switch case top > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = [b] = $([$(2)]);
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  const b /*:array*/ = [];
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


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
