# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > While > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
while (({ a } = $({ a: 1, b: 2 }))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  let a /*:unknown*/ = 999;
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1, b: 2 };
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
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  let a = 999;
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
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
if (b) {
  let d = 999;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = {
      a: 1,
      b: 2,
    };
    const f = $( e );
    d = f.a;
    if (f) {

    }
    else {
      break;
    }
  }
  $( d );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternObjRoot = { a: 999, b: 1000 };
let a = tmpBindingPatternObjRoot.a;
while (true) {
  let tmpIfTest = undefined;
  let tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: { a: '1', b: '2' }
 - 4: 100
 - 5: { a: '1', b: '2' }
 - 6: 100
 - 7: { a: '1', b: '2' }
 - 8: 100
 - 9: { a: '1', b: '2' }
 - 10: 100
 - 11: { a: '1', b: '2' }
 - 12: 100
 - 13: { a: '1', b: '2' }
 - 14: 100
 - 15: { a: '1', b: '2' }
 - 16: 100
 - 17: { a: '1', b: '2' }
 - 18: 100
 - 19: { a: '1', b: '2' }
 - 20: 100
 - 21: { a: '1', b: '2' }
 - 22: 100
 - 23: { a: '1', b: '2' }
 - 24: 100
 - 25: { a: '1', b: '2' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
