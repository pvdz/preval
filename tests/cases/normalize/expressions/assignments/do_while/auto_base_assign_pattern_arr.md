# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Do while > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [b] = $([$(2)])));
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = undefined;
let a /*:unknown*/ = undefined;
$(100);
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
if (tmpNestedAssignArrPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpArrElement$1 /*:unknown*/ = $(2);
    const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
    const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
    b = tmpArrPatternSplat$1[0];
    a = tmpNestedAssignArrPatternRhs$1;
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
let a = undefined;
$(100);
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  while (true) {
    $(100);
    const tmpArrElement$1 = $(2);
    const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
    b = [...tmpNestedAssignArrPatternRhs$1][0];
    a = tmpNestedAssignArrPatternRhs$1;
    if (!tmpNestedAssignArrPatternRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
$( 100 );
const c = $( 2 );
const d = [ c ];
const e = $( d );
const f = [ ...e ];
const g = f[ 0 ];
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( 2 );
    const i = [ h ];
    const j = $( i );
    const k = [ ...j ];
    a = k[ 0 ];
    b = j;
    if (j) {

    }
    else {
      break;
    }
  }
  $( b, a );
}
else {
  $( e, g );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: 100
 - 5: 2
 - 6: [2]
 - 7: 100
 - 8: 2
 - 9: [2]
 - 10: 100
 - 11: 2
 - 12: [2]
 - 13: 100
 - 14: 2
 - 15: [2]
 - 16: 100
 - 17: 2
 - 18: [2]
 - 19: 100
 - 20: 2
 - 21: [2]
 - 22: 100
 - 23: 2
 - 24: [2]
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
