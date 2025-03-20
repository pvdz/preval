# Preval test case

# write_loop_write_nested_loop_read2.md

> Assigns > Write loop write nested loop read2
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while ($('a')) {
  x = $(20, 'set');
  while ($('b')) {
    $(x, 'loop');
  }
}
`````


## Settled


`````js filename=intro
$(10);
while (true) {
  const tmpIfTest /*:unknown*/ = $(`a`);
  if (tmpIfTest) {
    const tmpClusterSSA_x /*:unknown*/ = $(20, `set`);
    const tmpIfTest$1 /*:unknown*/ = $(`b`);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
        $(tmpClusterSSA_x, `loop`);
        const tmpIfTest$2 /*:unknown*/ = $(`b`);
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
$(10);
while (true) {
  if ($(`a`)) {
    const tmpClusterSSA_x = $(20, `set`);
    if ($(`b`)) {
      while (true) {
        $(tmpClusterSSA_x, `loop`);
        if (!$(`b`)) {
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
$( 10 );
while (true) {
  const a = $( "a" );
  if (a) {
    const b = $( 20, "set" );
    const c = $( "b" );
    if (c) {
      while ($LOOP_UNROLL_10) {
        $( b, "loop" );
        const d = $( "b" );
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 'a'
 - 3: 20, 'set'
 - 4: 'b'
 - 5: 20, 'loop'
 - 6: 'b'
 - 7: 20, 'loop'
 - 8: 'b'
 - 9: 20, 'loop'
 - 10: 'b'
 - 11: 20, 'loop'
 - 12: 'b'
 - 13: 20, 'loop'
 - 14: 'b'
 - 15: 20, 'loop'
 - 16: 'b'
 - 17: 20, 'loop'
 - 18: 'b'
 - 19: 20, 'loop'
 - 20: 'b'
 - 21: 20, 'loop'
 - 22: 'b'
 - 23: 20, 'loop'
 - 24: 'b'
 - 25: 20, 'loop'
 - 26: 'b'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
