# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > For c > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  let tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a$2) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
    } else {
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(0);
      tmpClusterSSA_a$2 = $(tmpCalleeParam$2);
      if (tmpClusterSSA_a$2) {
      } else {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$4);
        if (tmpClusterSSA_a$1) {
          const tmpCalleeParam$6 /*:unknown*/ = $(2);
          $(tmpCalleeParam$6);
        } else {
        }
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
  let tmpClusterSSA_a$2 = $($(0));
  if (!tmpClusterSSA_a$2) {
    if ($($(1))) {
      $($(2));
    }
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a$2 = $($(0));
      if (!tmpClusterSSA_a$2) {
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

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($(0)) || ($($(1)) && $($(2)));
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = $(0);
    a = $(tmpCalleeParam);
    if (a) {
    } else {
      const tmpCalleeParam$1 = $(1);
      a = $(tmpCalleeParam$1);
      if (a) {
        const tmpCalleeParam$3 = $(2);
        a = $(tmpCalleeParam$3);
      } else {
      }
    }
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 0 );
  let c = $( b );
  if (c) {

  }
  else {
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
      const h = $( 0 );
      c = $( h );
      if (c) {

      }
      else {
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 1
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
