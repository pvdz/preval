# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    $(tmpCalleeParam$1);
  } else {
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      tmpClusterSSA_a = $(tmpCalleeParam$2);
      if (tmpClusterSSA_a) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        $(tmpCalleeParam$4);
      } else {
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    $($(2));
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = $($(1));
      if (tmpClusterSSA_a) {
        $($(2));
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
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
    const d = $( 2 );
    $( d );
  }
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( 1 );
      c = $( f );
      if (c) {
        const g = $( 2 );
        $( g );
      }
    }
    else {
      break;
    }
  }
  $( c );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 2
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
