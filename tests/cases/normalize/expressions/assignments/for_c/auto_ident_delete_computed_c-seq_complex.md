# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = delete ($(1), $(2), $(arg))[$("y")]);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj /*:unknown*/ = $(arg);
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  let tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(1);
      $(2);
      const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
      const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
      tmpClusterSSA_a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, arg);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
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
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  let tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  while (true) {
    if ($(1)) {
      $(1);
      $(2);
      const tmpDeleteCompObj$1 = $(arg);
      const tmpDeleteCompProp$1 = $(`y`);
      tmpClusterSSA_a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
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
  const d = $( "y" );
  let e = delete c[ d ];
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      $( 1 );
      $( 2 );
      const g = $( b );
      const h = $( "y" );
      e = delete g[ h ];
    }
    else {
      break;
    }
  }
  $( e, b );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  $( i, b );
}
`````


## Todos triggered


- objects in isFree check
- computed property access of an ident where the property ident is not recorded;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: 1
 - 7: 1
 - 8: 2
 - 9: {}
 - 10: 'y'
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: {}
 - 15: 'y'
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 'y'
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
