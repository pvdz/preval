# Preval test case

# for3.md

> Labels > For3
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if ($()) break foo;
  else continue foo;
}
$(2);
`````


## Settled


`````js filename=intro
$(0);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $();
  if (tmpIfTest$1) {
    $(2);
  } else {
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        const tmpIfTest$4 /*:unknown*/ = $();
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
  if ($()) {
    $(2);
  } else {
    while (true) {
      if ($(true)) {
        if ($()) {
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
  const b = $();
  if (b) {
    $( 2 );
  }
  else {
    while ($LOOP_UNROLL_10) {
      const c = $( true );
      if (c) {
        const d = $();
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 
 - 4: true
 - 5: 
 - 6: true
 - 7: 
 - 8: true
 - 9: 
 - 10: true
 - 11: 
 - 12: true
 - 13: 
 - 14: true
 - 15: 
 - 16: true
 - 17: 
 - 18: true
 - 19: 
 - 20: true
 - 21: 
 - 22: true
 - 23: 
 - 24: true
 - 25: 
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
