# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > For c > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = delete ($(1), $(2), $(arg)).y);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ /*truthy*/ = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj /*:unknown*/ = $(arg);
  let tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(1);
      $(2);
      const tmpDeleteObj$1 /*:unknown*/ = $(arg);
      tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, arg);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  let tmpClusterSSA_a = delete tmpDeleteObj.y;
  while (true) {
    if ($(1)) {
      $(1);
      $(2);
      const tmpDeleteObj$1 = $(arg);
      tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, arg);
} else {
  $({ a: 999, b: 1000 }, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  $( 1 );
  $( 2 );
  const c = $( b );
  let d = delete c.y;
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      $( 1 );
      $( 2 );
      const f = $( b );
      d = delete f.y;
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
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteObj = $(arg);
    a = delete tmpDeleteObj.y;
  } else {
    break;
  }
}
$(a, arg);
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: {}
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: {}
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: {}
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
