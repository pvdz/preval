# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For c > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = [x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  let x /*:unknown*/ = tmpArrPatternSplat[0];
  let y /*:unknown*/ = tmpArrPatternSplat[1];
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignArrPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(x);
      $(y);
      const tmpArrElement$2 /*:unknown*/ = $(3);
      const tmpArrElement$4 /*:unknown*/ = $(4);
      const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [tmpArrElement$2, tmpArrElement$4];
      const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
      x = tmpArrPatternSplat$1[0];
      y = tmpArrPatternSplat$1[1];
      tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, x, y);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  let x = tmpArrPatternSplat[0];
  let y = tmpArrPatternSplat[1];
  let tmpClusterSSA_a = tmpNestedAssignArrPatternRhs;
  while (true) {
    if ($(1)) {
      $(x);
      $(y);
      const tmpArrElement$2 = $(3);
      const tmpArrElement$4 = $(4);
      const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$4];
      const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
      x = tmpArrPatternSplat$1[0];
      y = tmpArrPatternSplat$1[1];
      tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, x, y);
} else {
  $({ a: 999, b: 1000 }, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 1 );
  $( 2 );
  const b = $( 3 );
  const c = $( 4 );
  const d = [ b, c ];
  const e = [ ...d ];
  let f = e[ 0 ];
  let g = e[ 1 ];
  let h = d;
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      $( f );
      $( g );
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


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) objects in isFree check
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 1
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 1
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 1
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
