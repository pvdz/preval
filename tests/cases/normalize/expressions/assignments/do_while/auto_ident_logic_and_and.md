# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$3);
    if (a) {
      while ($LOOP_UNROLL_10) {
        $(100);
        const tmpCalleeParam$2 /*:unknown*/ = $(1);
        a = $(tmpCalleeParam$2);
        if (a) {
          const tmpCalleeParam$4 /*:unknown*/ = $(1);
          a = $(tmpCalleeParam$4);
          if (a) {
            const tmpCalleeParam$6 /*:unknown*/ = $(2);
            a = $(tmpCalleeParam$6);
            if (a) {
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
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
let a = $($(1));
if (a) {
  a = $($(1));
  if (a) {
    a = $($(2));
    if (a) {
      while (true) {
        $(100);
        a = $($(1));
        if (a) {
          a = $($(1));
          if (a) {
            a = $($(2));
            if (!a) {
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
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(1)) && $($(1)) && $($(2)))) {
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
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
    } else {
    }
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
    if (b) {
      while ($LOOP_UNROLL_10) {
        $( 100 );
        const e = $( 1 );
        b = $( e );
        if (b) {
          const f = $( 1 );
          b = $( f );
          if (b) {
            const g = $( 2 );
            b = $( g );
            if (b) {

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
$( b );
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

Todos triggered:
- objects in isFree check