# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(1)) && $($(2)))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    let a /*:unknown*/ = undefined;
    $(100);
    while ($LOOP_UNROLL_10) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$2);
      if (a) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$4);
        if (a) {
          $(100);
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
const tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  const tmpClusterSSA_a$1 = $($(2));
  if (tmpClusterSSA_a$1) {
    let a = undefined;
    $(100);
    while (true) {
      a = $($(1));
      if (a) {
        a = $($(2));
        if (a) {
          $(100);
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


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  if (d) {
    let e = undefined;
    $( 100 );
    while ($LOOP_UNROLL_10) {
      const f = $( 1 );
      e = $( f );
      if (e) {
        const g = $( 2 );
        e = $( g );
        if (e) {
          $( 100 );
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
  let tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    let tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
  } else {
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
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
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 1
 - 7: 1
 - 8: 2
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 2
 - 20: 100
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
