# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For c > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(0)) || $($(1)) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpClusterSSA_a = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a) {
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      tmpClusterSSA_a = $(tmpCalleeParam$3);
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(0);
      tmpClusterSSA_a = $(tmpCalleeParam$2);
      if (tmpClusterSSA_a) {
      } else {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        tmpClusterSSA_a = $(tmpCalleeParam$4);
        if (tmpClusterSSA_a) {
        } else {
          const tmpCalleeParam$6 /*:unknown*/ = $(2);
          tmpClusterSSA_a = $(tmpCalleeParam$6);
        }
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a = $($(0));
  if (!tmpClusterSSA_a) {
    tmpClusterSSA_a = $($(1));
    if (!tmpClusterSSA_a) {
      tmpClusterSSA_a = $($(2));
    }
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = $($(0));
      if (!tmpClusterSSA_a) {
        tmpClusterSSA_a = $($(1));
        if (!tmpClusterSSA_a) {
          tmpClusterSSA_a = $($(2));
        }
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
  const b = $( 0 );
  let c = $( b );
  if (c) {

  }
  else {
    const d = $( 1 );
    c = $( d );
    if (c) {

    }
    else {
      const e = $( 2 );
      c = $( e );
    }
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( 0 );
      c = $( g );
      if (c) {

      }
      else {
        const h = $( 1 );
        c = $( h );
        if (c) {

        }
        else {
          const i = $( 2 );
          c = $( i );
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
  const j = {
    a: 999,
    b: 1000,
  };
  $( j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let tmpCalleeParam = $(0);
    a = $(tmpCalleeParam);
    if (a) {
    } else {
      let tmpCalleeParam$1 = $(1);
      a = $(tmpCalleeParam$1);
      if (a) {
      } else {
        let tmpCalleeParam$3 = $(2);
        a = $(tmpCalleeParam$3);
      }
    }
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
