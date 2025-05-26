# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > For c > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = b = $(2));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpNestedComplexRhs /*:unknown*/ = $(2);
  let tmpClusterSSA_b /*:unknown*/ = tmpNestedComplexRhs;
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedComplexRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedComplexRhs$1 /*:unknown*/ = $(2);
      tmpClusterSSA_b = tmpNestedComplexRhs$1;
      tmpClusterSSA_a = tmpNestedComplexRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNestedComplexRhs = $(2);
  let tmpClusterSSA_b = tmpNestedComplexRhs;
  let tmpClusterSSA_a = tmpNestedComplexRhs;
  while (true) {
    if ($(1)) {
      const tmpNestedComplexRhs$1 = $(2);
      tmpClusterSSA_b = tmpNestedComplexRhs$1;
      tmpClusterSSA_a = tmpNestedComplexRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  let c = b;
  let d = b;
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( 2 );
      c = f;
      d = f;
    }
    else {
      break;
    }
  }
  $( d, c );
}
else {
  const g = {
    a: 999,
    b: 1000,
  };
  $( g, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedComplexRhs = $(2);
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
