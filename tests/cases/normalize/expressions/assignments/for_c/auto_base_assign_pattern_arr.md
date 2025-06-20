# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > For c > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; $(1); a = [b] = $([$(2)]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
  let tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignArrPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpArrElement$1 /*:unknown*/ = $(2);
      const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement$1];
      const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs$1];
      tmpClusterSSA_b = tmpArrPatternSplat$1[0];
      tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  const b /*:array*/ /*truthy*/ = [];
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpArrElement = $(2);
  const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
  let tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
  let tmpClusterSSA_a = tmpNestedAssignArrPatternRhs;
  while (true) {
    if ($(1)) {
      const tmpArrElement$1 = $(2);
      const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
      tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs$1][0];
      tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  $({ a: 999, b: 1000 }, []);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  const c = [ b ];
  const d = $( c );
  const e = [ ...d ];
  let f = e[ 0 ];
  let g = d;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( 2 );
      const j = [ i ];
      const k = $( j );
      const l = [ ...k ];
      f = l[ 0 ];
      g = k;
    }
    else {
      break;
    }
  }
  $( g, f );
}
else {
  const m = {
    a: 999,
    b: 1000,
  };
  const n = [];
  $( m, n );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpArrElement = $(2);
    let tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = tmpArrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: 1
 - 5: 2
 - 6: [2]
 - 7: 1
 - 8: 2
 - 9: [2]
 - 10: 1
 - 11: 2
 - 12: [2]
 - 13: 1
 - 14: 2
 - 15: [2]
 - 16: 1
 - 17: 2
 - 18: [2]
 - 19: 1
 - 20: 2
 - 21: [2]
 - 22: 1
 - 23: 2
 - 24: [2]
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
