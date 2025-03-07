# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
        $(100);
        const tmpCalleeParam$2 /*:unknown*/ = $(1);
        const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$2);
        if (tmpIfTest$1) {
          const tmpCalleeParam$4 /*:unknown*/ = $(1);
          const tmpClusterSSA_tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$4);
          if (tmpClusterSSA_tmpIfTest$2) {
            const tmpCalleeParam$6 /*:unknown*/ = $(2);
            const tmpClusterSSA_tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$6);
            if (tmpClusterSSA_tmpIfTest$4) {
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
    } else {
    }
  } else {
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if ($($(1))) {
  if ($($(1))) {
    if ($($(2))) {
      while (true) {
        $(100);
        if ($($(1))) {
          if ($($(1))) {
            if (!$($(2))) {
              break;
            }
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(1)) && $($(1)) && $($(2))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCalleeParam = $(1);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = $(tmpCalleeParam$3);
      if (tmpIfTest) {
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
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    if (f) {
      while ($LOOP_UNROLL_10) {
        $( 100 );
        const g = $( 1 );
        const h = $( g );
        if (h) {
          const i = $( 1 );
          const j = $( i );
          if (j) {
            const k = $( 2 );
            const l = $( k );
            if (l) {

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
    }
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
