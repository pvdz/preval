# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > For c > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); [a] = $([1, 2]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [1, 2];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrAssignPatternRhs];
  let tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$1[0];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:array*/ = [1, 2];
      const tmpArrAssignPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpArrPatternSplat$2 /*:array*/ = [...tmpArrAssignPatternRhs$1];
      tmpClusterSSA_a = tmpArrPatternSplat$2[0];
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
if ($(1)) {
  const tmpArrAssignPatternRhs = $([1, 2]);
  let tmpClusterSSA_a = [...tmpArrAssignPatternRhs][0];
  while (true) {
    if ($(1)) {
      const tmpArrAssignPatternRhs$1 = $([1, 2]);
      tmpClusterSSA_a = [...tmpArrAssignPatternRhs$1][0];
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
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
const b = [ ...a ];
const c = b[ 0 ];
const d = $( 1 );
if (d) {
  const e = [ 1, 2 ];
  const f = $( e );
  const g = [ ...f ];
  let h = g[ 0 ];
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      const j = [ 1, 2 ];
      const k = $( j );
      const l = [ ...k ];
      h = l[ 0 ];
    }
    else {
      break;
    }
  }
  $( h );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let tmpCalleeParam = [1, 2];
    const tmpArrAssignPatternRhs = $(tmpCalleeParam);
    const tmpArrPatternSplat$1 = [...tmpArrAssignPatternRhs];
    a = tmpArrPatternSplat$1[0];
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
