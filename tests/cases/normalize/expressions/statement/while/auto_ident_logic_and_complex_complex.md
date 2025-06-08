# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(1)) && $($(2))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
    while ($LOOP_UNROLL_10) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$2);
      if (tmpIfTest$1) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$4);
        if (tmpClusterSSA_tmpIfTest$1) {
          $(100);
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
if ($($(1))) {
  if ($($(2))) {
    $(100);
    while (true) {
      if ($($(1))) {
        if ($($(2))) {
          $(100);
        } else {
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
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  if (d) {
    $( 100 );
    while ($LOOP_UNROLL_10) {
      const e = $( 1 );
      const f = $( e );
      if (f) {
        const g = $( 2 );
        const h = $( g );
        if (h) {
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
  let tmpCalleeParam = $(1);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    let tmpCalleeParam$1 = $(2);
    tmpIfTest = $(tmpCalleeParam$1);
    if (tmpIfTest) {
      $(100);
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
