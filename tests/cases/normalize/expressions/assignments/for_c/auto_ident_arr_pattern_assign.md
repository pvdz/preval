# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For c > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = [x, y] = [$(3), $(4)]);
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
  let tmpClusterSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
  let tmpClusterSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
  let tmpClusterSSA_a /*:array*/ /*truthy*/ = tmpNestedAssignArrPatternRhs;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpArrElement$2 /*:unknown*/ = $(3);
      const tmpArrElement$4 /*:unknown*/ = $(4);
      const tmpNestedAssignArrPatternRhs$1 /*:array*/ /*truthy*/ = [tmpArrElement$2, tmpArrElement$4];
      const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs$1];
      tmpClusterSSA_x = tmpArrPatternSplat$1[0];
      tmpClusterSSA_y = tmpArrPatternSplat$1[1];
      tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  let tmpClusterSSA_x = tmpArrPatternSplat[0];
  let tmpClusterSSA_y = tmpArrPatternSplat[1];
  let tmpClusterSSA_a = tmpNestedAssignArrPatternRhs;
  while (true) {
    if ($(1)) {
      const tmpArrElement$2 = $(3);
      const tmpArrElement$4 = $(4);
      const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$4];
      const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
      tmpClusterSSA_x = tmpArrPatternSplat$1[0];
      tmpClusterSSA_y = tmpArrPatternSplat$1[1];
      tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  $({ a: 999, b: 1000 }, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  const d = [ b, c ];
  const e = [ ...d ];
  let f = e[ 0 ];
  let g = e[ 1 ];
  let h = d;
  while ($LOOP_UNROLLS_LEFT_10) {
    const i = $( 1 );
    if (i) {
      const j = $( 3 );
      const k = $( 4 );
      const l = [ j, k ];
      const m = [ ...l ];
      f = m[ 0 ];
      g = m[ 1 ];
      h = l;
    }
    else {
      break;
    }
  }
  $( h, f, g );
}
else {
  const n = {
    a: 999,
    b: 1000,
  };
  $( n, 1, 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
  } else {
    break;
  }
}
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) objects in isFree check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: 1
 - 5: 3
 - 6: 4
 - 7: 1
 - 8: 3
 - 9: 4
 - 10: 1
 - 11: 3
 - 12: 4
 - 13: 1
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 1
 - 20: 3
 - 21: 4
 - 22: 1
 - 23: 3
 - 24: 4
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
