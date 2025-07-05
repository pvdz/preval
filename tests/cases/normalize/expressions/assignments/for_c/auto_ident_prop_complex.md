# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b).c);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { c: 1 };
if (tmpIfTest) {
  const tmpAssignRhsProp /*:unknown*/ = $(b);
  let tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpAssignRhsProp$1 /*:unknown*/ = $(b);
      tmpClusterSSA_a = tmpAssignRhsProp$1.c;
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
const b = { c: 1 };
if (tmpIfTest) {
  let tmpClusterSSA_a = $(b).c;
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = $(b).c;
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
const b = { c: 1 };
if (a) {
  const c = $( b );
  let d = c.c;
  while ($LOOP_UNROLLS_LEFT_10) {
    const e = $( 1 );
    if (e) {
      const f = $( b );
      d = f.c;
    }
    else {
      break;
    }
  }
  $( d, b );
}
else {
  const g = {
    a: 999,
    b: 1000,
  };
  $( g, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignRhsProp = $(b);
    a = tmpAssignRhsProp.c;
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 1
 - 4: { c: '1' }
 - 5: 1
 - 6: { c: '1' }
 - 7: 1
 - 8: { c: '1' }
 - 9: 1
 - 10: { c: '1' }
 - 11: 1
 - 12: { c: '1' }
 - 13: 1
 - 14: { c: '1' }
 - 15: 1
 - 16: { c: '1' }
 - 17: 1
 - 18: { c: '1' }
 - 19: 1
 - 20: { c: '1' }
 - 21: 1
 - 22: { c: '1' }
 - 23: 1
 - 24: { c: '1' }
 - 25: 1
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
