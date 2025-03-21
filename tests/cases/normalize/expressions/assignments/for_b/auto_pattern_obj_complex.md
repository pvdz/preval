# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > For b > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (; ({ a } = $({ a: 1, b: 2 })); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  while (true) {
    $(1);
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
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = c.a;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: { a: '1', b: '2' }
 - 4: 1
 - 5: { a: '1', b: '2' }
 - 6: 1
 - 7: { a: '1', b: '2' }
 - 8: 1
 - 9: { a: '1', b: '2' }
 - 10: 1
 - 11: { a: '1', b: '2' }
 - 12: 1
 - 13: { a: '1', b: '2' }
 - 14: 1
 - 15: { a: '1', b: '2' }
 - 16: 1
 - 17: { a: '1', b: '2' }
 - 18: 1
 - 19: { a: '1', b: '2' }
 - 20: 1
 - 21: { a: '1', b: '2' }
 - 22: 1
 - 23: { a: '1', b: '2' }
 - 24: 1
 - 25: { a: '1', b: '2' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
