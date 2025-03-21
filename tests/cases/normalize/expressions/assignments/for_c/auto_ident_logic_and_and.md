# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > For c > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(1)) && $($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a$2) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
    } else {
    }
  } else {
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      tmpClusterSSA_a$2 = $(tmpCalleeParam$2);
      if (tmpClusterSSA_a$2) {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$4);
        if (tmpClusterSSA_a$1) {
          const tmpCalleeParam$6 /*:unknown*/ = $(2);
          $(tmpCalleeParam$6);
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a$2);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a$2 = $($(1));
  if (tmpClusterSSA_a$2) {
    if ($($(1))) {
      $($(2));
    }
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a$2 = $($(1));
      if (tmpClusterSSA_a$2) {
        if ($($(1))) {
          $($(2));
        }
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a$2);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  let c = $( b );
  if (c) {
    const d = $( 1 );
    const e = $( d );
    if (e) {
      const f = $( 2 );
      $( f );
    }
  }
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 1 );
      c = $( h );
      if (c) {
        const i = $( 1 );
        const j = $( i );
        if (j) {
          const k = $( 2 );
          $( k );
        }
      }
    }
    else {
      break;
    }
  }
  $( c );
}
else {
  const l = {
    a: 999,
    b: 1000,
  };
  $( l );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
