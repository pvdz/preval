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
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_a$3) {
      let a /*:unknown*/ = undefined;
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
      $(tmpClusterSSA_a$3);
    }
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
  const tmpClusterSSA_a$1 = $($(1));
  if (tmpClusterSSA_a$1) {
    const tmpClusterSSA_a$3 = $($(2));
    if (tmpClusterSSA_a$3) {
      let a = undefined;
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
      $(tmpClusterSSA_a$3);
    }
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
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    if (f) {
      let g = undefined;
      $( 100 );
      while ($LOOP_UNROLL_10) {
        const h = $( 1 );
        g = $( h );
        if (g) {
          const i = $( 1 );
          g = $( i );
          if (g) {
            const j = $( 2 );
            g = $( j );
            if (g) {
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
      $( g );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
    } else {
    }
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
