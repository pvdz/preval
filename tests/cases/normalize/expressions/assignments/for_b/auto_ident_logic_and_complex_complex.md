# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(1)) && $($(2))); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    $(1);
    while ($LOOP_UNROLL_10) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$2);
      if (a) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$4);
        if (a) {
          $(1);
        } else {
          break;
        }
      } else {
        break;
      }
    }
    $(a);
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
  const tmpClusterSSA_a = $($(2));
  if (tmpClusterSSA_a) {
    $(1);
    while (true) {
      a = $($(1));
      if (a) {
        a = $($(2));
        if (a) {
          $(1);
        } else {
          break;
        }
      } else {
        break;
      }
    }
    $(a);
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
  const c = $( 2 );
  const d = $( c );
  if (d) {
    $( 1 );
    while ($LOOP_UNROLL_10) {
      const e = $( 1 );
      b = $( e );
      if (b) {
        const f = $( 2 );
        b = $( f );
        if (b) {
          $( 1 );
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
    $( d );
  }
}
else {
  $( b );
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
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 2
 - 9: 2
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 2
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 2
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
