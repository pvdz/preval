# Preval test case

# auto_ident_upd_pi_complex2.md

> Normalize > Expressions > Assignments > For c > Auto ident upd pi complex2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { x: 1 };
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs /*:primitive*/ = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedPropCompoundComplexRhs;
  while ($LOOP_UNROLL_10) {
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(b);
      const tmpNestedAssignObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpBinLhs$1 /*:unknown*/ = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 /*:primitive*/ = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      tmpClusterSSA_a = tmpNestedPropCompoundComplexRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpNestedAssignObj = $($(b));
  const tmpNestedPropCompoundComplexRhs = tmpNestedAssignObj.x + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  let tmpClusterSSA_a = tmpNestedPropCompoundComplexRhs;
  while (true) {
    if ($(1)) {
      const tmpNestedAssignObj$1 = $($(b));
      const tmpNestedPropCompoundComplexRhs$1 = tmpNestedAssignObj$1.x + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      tmpClusterSSA_a = tmpNestedPropCompoundComplexRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
if (a) {
  const c = $( b );
  const d = $( c );
  const e = d.x;
  const f = e + 1;
  d.x = f;
  let g = f;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( b );
      const j = $( i );
      const k = j.x;
      const l = k + 1;
      j.x = l;
      g = l;
    }
    else {
      break;
    }
  }
  $( g, b );
}
else {
  const m = {
    a: 999,
    b: 1000,
  };
  $( m, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { x: 1 };
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '2' }
 - 6: { x: '2' }
 - 7: 1
 - 8: { x: '3' }
 - 9: { x: '3' }
 - 10: 1
 - 11: { x: '4' }
 - 12: { x: '4' }
 - 13: 1
 - 14: { x: '5' }
 - 15: { x: '5' }
 - 16: 1
 - 17: { x: '6' }
 - 18: { x: '6' }
 - 19: 1
 - 20: { x: '7' }
 - 21: { x: '7' }
 - 22: 1
 - 23: { x: '8' }
 - 24: { x: '8' }
 - 25: 1
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
