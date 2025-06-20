# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(1)) && $($(2))));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    let a /*:unknown*/ = undefined;
    while ($LOOP_UNROLL_10) {
      $(100);
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$2);
      if (a) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$4);
        if (a) {
        } else {
          break;
        }
      } else {
        break;
      }
    }
    $(a);
  } else {
    $(tmpClusterSSA_a$1);
  }
} else {
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  const tmpClusterSSA_a$1 = $($(2));
  if (tmpClusterSSA_a$1) {
    let a = undefined;
    while (true) {
      $(100);
      a = $($(1));
      if (a) {
        a = $($(2));
        if (!a) {
          break;
        }
      } else {
        break;
      }
    }
    $(a);
  } else {
    $(tmpClusterSSA_a$1);
  }
} else {
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  if (d) {
    let e = undefined;
    while ($LOOP_UNROLL_10) {
      $( 100 );
      const f = $( 1 );
      e = $( f );
      if (e) {
        const g = $( 2 );
        e = $( g );
        if (e) {

        }
        else {
          break;
        }
      }
      else {
        break;
      }
    }
    $( e );
  }
  else {
    $( d );
  }
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    let tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
  } else {
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
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
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
