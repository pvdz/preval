# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > While > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(1)) && $($(1)) && $($(2)))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_a$1) {
      $(100);
      while ($LOOP_UNROLL_10) {
        const tmpCalleeParam$2 /*:unknown*/ = $(1);
        a = $(tmpCalleeParam$2);
        if (a) {
          const tmpCalleeParam$4 /*:unknown*/ = $(1);
          a = $(tmpCalleeParam$4);
          if (a) {
            const tmpCalleeParam$6 /*:unknown*/ = $(2);
            a = $(tmpCalleeParam$6);
            if (a) {
              $(100);
            } else {
              break;
            }
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
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    const tmpClusterSSA_a$1 = $($(2));
    if (tmpClusterSSA_a$1) {
      $(100);
      while (true) {
        a = $($(1));
        if (a) {
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
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    if (f) {
      $( 100 );
      while ($LOOP_UNROLL_10) {
        const g = $( 1 );
        b = $( g );
        if (b) {
          const h = $( 1 );
          b = $( h );
          if (b) {
            const i = $( 2 );
            b = $( i );
            if (b) {
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
        else {
          break;
        }
      }
      $( b );
    }
    else {
      $( f );
    }
  }
  else {
    $( d );
  }
}
else {
  $( b );
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 2
 - 14: 100
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
