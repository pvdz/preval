# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > For c > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); [a] = ($(10), $(20), $([1, 2])));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs];
  let tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$1[0];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(10);
      $(20);
      const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2];
      const tmpArrAssignPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpArrPatternSplat$2 /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs$1];
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
  $(10);
  $(20);
  const tmpArrAssignPatternRhs = $([1, 2]);
  let tmpClusterSSA_a = [...tmpArrAssignPatternRhs][0];
  while (true) {
    if ($(1)) {
      $(10);
      $(20);
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
  $( 10 );
  $( 20 );
  const e = [ 1, 2 ];
  const f = $( e );
  const g = [ ...f ];
  let h = g[ 0 ];
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      $( 10 );
      $( 20 );
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
    $(10);
    $(20);
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
- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
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
