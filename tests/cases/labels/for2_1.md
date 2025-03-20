# Preval test case

# for2_1.md

> Labels > For2 1
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if ($(0)) break foo;
  else continue foo;
}
$(2);
`````


## Settled


`````js filename=intro
$(0);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(0);
  if (tmpIfTest$1) {
    $(2);
  } else {
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        const tmpIfTest$4 /*:unknown*/ = $(0);
        if (tmpIfTest$4) {
          break;
        } else {
        }
      } else {
        break;
      }
    }
    $(2);
  }
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
if ($(true)) {
  if ($(0)) {
    $(2);
  } else {
    while (true) {
      if ($(true)) {
        if ($(0)) {
          break;
        }
      } else {
        break;
      }
    }
    $(2);
  }
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
const a = $( true );
if (a) {
  const b = $( 0 );
  if (b) {
    $( 2 );
  }
  else {
    while ($LOOP_UNROLL_10) {
      const c = $( true );
      if (c) {
        const d = $( 0 );
        if (d) {
          break;
        }
      }
      else {
        break;
      }
    }
    $( 2 );
  }
}
else {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 0
 - 4: true
 - 5: 0
 - 6: true
 - 7: 0
 - 8: true
 - 9: 0
 - 10: true
 - 11: 0
 - 12: true
 - 13: 0
 - 14: true
 - 15: 0
 - 16: true
 - 17: 0
 - 18: true
 - 19: 0
 - 20: true
 - 21: 0
 - 22: true
 - 23: 0
 - 24: true
 - 25: 0
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
