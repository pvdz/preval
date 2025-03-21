# Preval test case

# write_loop_read_nested_loop_read.md

> Assigns > Write loop read nested loop read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(1);
while ($(true)) {
  $(x, 'loop1');
  while ($(true)) {
    $(x, 'loop2');
  }
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
while (true) {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(x, `loop1`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
        $(x, `loop2`);
        const tmpIfTest$2 /*:unknown*/ = $(true);
        if (tmpIfTest$2) {
        } else {
          break;
        }
      }
    } else {
    }
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
while (true) {
  if ($(true)) {
    $(x, `loop1`);
    if ($(true)) {
      while (true) {
        $(x, `loop2`);
        if (!$(true)) {
          break;
        }
      }
    }
  } else {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
while (true) {
  const b = $( true );
  if (b) {
    $( a, "loop1" );
    const c = $( true );
    if (c) {
      while ($LOOP_UNROLL_10) {
        $( a, "loop2" );
        const d = $( true );
        if (d) {

        }
        else {
          break;
        }
      }
    }
  }
  else {
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
 - 1: 1
 - 2: true
 - 3: 1, 'loop1'
 - 4: true
 - 5: 1, 'loop2'
 - 6: true
 - 7: 1, 'loop2'
 - 8: true
 - 9: 1, 'loop2'
 - 10: true
 - 11: 1, 'loop2'
 - 12: true
 - 13: 1, 'loop2'
 - 14: true
 - 15: 1, 'loop2'
 - 16: true
 - 17: 1, 'loop2'
 - 18: true
 - 19: 1, 'loop2'
 - 20: true
 - 21: 1, 'loop2'
 - 22: true
 - 23: 1, 'loop2'
 - 24: true
 - 25: 1, 'loop2'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
