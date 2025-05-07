# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > While > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (([a] = ($(10), $(20), $([1, 2])))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
let a /*:unknown*/ = tmpArrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(10);
    $(20);
    const tmpCalleeParam$1 /*:array*/ = [1, 2];
    const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpArrPatternSplat$2 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
    a = tmpArrPatternSplat$2[0];
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
let a = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  while (true) {
    $(100);
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
    a = [...tmpNestedAssignArrPatternRhs$1][0];
    if (!tmpNestedAssignArrPatternRhs$1) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
$( 10 );
$( 20 );
const b = [ 1, 2 ];
const c = $( b );
const d = [ ...c ];
let e = d[ 0 ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 10 );
    $( 20 );
    const f = [ 1, 2 ];
    const g = $( f );
    const h = [ ...g ];
    e = h[ 0 ];
    if (g) {

    }
    else {
      break;
    }
  }
  $( e );
}
else {
  $( e );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) do we want to support ArrayExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
