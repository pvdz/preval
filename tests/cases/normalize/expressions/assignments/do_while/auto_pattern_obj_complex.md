# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Do while > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
do {
  $(100);
} while (({ a } = $({ a: 1, b: 2 })));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    a = tmpNestedAssignObjPatternRhs$1.a;
    if (tmpNestedAssignObjPatternRhs$1) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
$(100);
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  while (true) {
    $(100);
    const tmpNestedAssignObjPatternRhs$1 = $({ a: 1, b: 2 });
    a = tmpNestedAssignObjPatternRhs$1.a;
    if (!tmpNestedAssignObjPatternRhs$1) {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$( 100 );
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = c.a;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = {
      a: 1,
      b: 2,
    };
    const f = $( e );
    a = f.a;
    if (f) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( d );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: 100
 - 4: { a: '1', b: '2' }
 - 5: 100
 - 6: { a: '1', b: '2' }
 - 7: 100
 - 8: { a: '1', b: '2' }
 - 9: 100
 - 10: { a: '1', b: '2' }
 - 11: 100
 - 12: { a: '1', b: '2' }
 - 13: 100
 - 14: { a: '1', b: '2' }
 - 15: 100
 - 16: { a: '1', b: '2' }
 - 17: 100
 - 18: { a: '1', b: '2' }
 - 19: 100
 - 20: { a: '1', b: '2' }
 - 21: 100
 - 22: { a: '1', b: '2' }
 - 23: 100
 - 24: { a: '1', b: '2' }
 - 25: 100
 - 26: { a: '1', b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
