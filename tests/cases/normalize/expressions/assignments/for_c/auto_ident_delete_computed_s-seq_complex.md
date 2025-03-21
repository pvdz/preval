# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = delete ($(1), $(2), arg)[$("y")]);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  let tmpClusterSSA_a /*:boolean*/ = delete arg[tmpDeleteCompProp];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(1);
      $(2);
      const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
      tmpClusterSSA_a = delete arg[tmpDeleteCompProp$1];
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
  const tmpDeleteCompProp = $(`y`);
  let tmpClusterSSA_a = delete arg[tmpDeleteCompProp];
  while (true) {
    if ($(1)) {
      $(1);
      $(2);
      const tmpDeleteCompProp$1 = $(`y`);
      tmpClusterSSA_a = delete arg[tmpDeleteCompProp$1];
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
  const c = $( "y" );
  let d = delete b[ c ];
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      $( 1 );
      $( 2 );
      const f = $( "y" );
      d = delete b[ f ];
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


## Todos triggered


- (todo) objects in isFree check
- (todo) computed property access of an ident where the property ident is not recorded;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 'y'
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 'y'
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 'y'
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 'y'
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 'y'
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
