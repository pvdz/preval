# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    while ($LOOP_UNROLL_10) {
      $(100);
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$2);
      if (tmpIfTest$1) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$4);
        if (tmpClusterSSA_tmpIfTest$1) {
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if ($($(1))) {
  if ($($(2))) {
    while (true) {
      $(100);
      if ($($(1))) {
        if (!$($(2))) {
          break;
        }
      } else {
        break;
      }
    }
  }
}
$({ a: 999, b: 1000 });
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
    while ($LOOP_UNROLL_10) {
      $( 100 );
      const e = $( 1 );
      const f = $( e );
      if (f) {
        const g = $( 2 );
        const h = $( g );
        if (h) {

        }
        else {
          break;
        }
      }
      else {
        break;
      }
    }
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpCalleeParam = $(1);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    let tmpCalleeParam$1 = $(2);
    tmpIfTest = $(tmpCalleeParam$1);
    if (tmpIfTest) {
    } else {
      break;
    }
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


None


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
