# Preval test case

# write_loop_write_nested_loop_read_read.md

> Assigns > Write loop write nested loop read read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while ($(true)) {
  x = $(20, 'set');
  while ($(true)) {
    $(x, 'loop');
  }
  $(x);
}
`````


## Settled


`````js filename=intro
$(10);
while (true) {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    const tmpClusterSSA_x /*:unknown*/ = $(20, `set`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
        $(tmpClusterSSA_x, `loop`);
        const tmpIfTest$2 /*:unknown*/ = $(true);
        if (tmpIfTest$2) {
        } else {
          break;
        }
      }
      $(tmpClusterSSA_x);
    } else {
      $(tmpClusterSSA_x);
    }
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
while (true) {
  if ($(true)) {
    const tmpClusterSSA_x = $(20, `set`);
    if ($(true)) {
      while (true) {
        $(tmpClusterSSA_x, `loop`);
        if (!$(true)) {
          break;
        }
      }
      $(tmpClusterSSA_x);
    } else {
      $(tmpClusterSSA_x);
    }
  } else {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
while (true) {
  const a = $( true );
  if (a) {
    const b = $( 20, "set" );
    const c = $( true );
    if (c) {
      while ($LOOP_UNROLL_10) {
        $( b, "loop" );
        const d = $( true );
        if (d) {

        }
        else {
          break;
        }
      }
      $( b );
    }
    else {
      $( b );
    }
  }
  else {
    break;
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    x = $(20, `set`);
    while (true) {
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        $(x, `loop`);
      } else {
        break;
      }
    }
    $(x);
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: true
 - 3: 20, 'set'
 - 4: true
 - 5: 20, 'loop'
 - 6: true
 - 7: 20, 'loop'
 - 8: true
 - 9: 20, 'loop'
 - 10: true
 - 11: 20, 'loop'
 - 12: true
 - 13: 20, 'loop'
 - 14: true
 - 15: 20, 'loop'
 - 16: true
 - 17: 20, 'loop'
 - 18: true
 - 19: 20, 'loop'
 - 20: true
 - 21: 20, 'loop'
 - 22: true
 - 23: 20, 'loop'
 - 24: true
 - 25: 20, 'loop'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
