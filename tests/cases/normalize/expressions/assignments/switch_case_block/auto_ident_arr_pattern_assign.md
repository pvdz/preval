# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = [x, y] = [$(3), $(4)];
  }
}
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
  const tmpClusterSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  $(tmpNestedAssignArrPatternRhs, tmpArrPatternSplat[0], tmpArrPatternSplat[1]);
} else {
  $({ a: 999, b: 1000 }, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = $( 3 );
  const e = $( 4 );
  const f = [ d, e ];
  const g = [ ...f ];
  const h = g[ 0 ];
  const i = g[ 1 ];
  $( f, h, i );
}
else {
  const j = {
    a: 999,
    b: 1000,
  };
  $( j, 1, 2 );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 4
 - 5: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
