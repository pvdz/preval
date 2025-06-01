# Preval test case

# ai_nested_loop_break_outer_label.md

> Ai > Ai1 > Ai nested loop break outer label
>
> Test: Nested loops with break from inner loop to outer label.

## Input

`````js filename=intro
// Expected: (Complex, S4 and S5 reachability is key)
outer_label: while ($('L1')) {
  $('S1');
  while ($('L2')) {
    $('S2');
    if ($('C_break_outer')) {
      break outer_label;
    }
    $('S3');
  }
  $('S4');
}
$('S5');
`````


## Settled


`````js filename=intro
outer_label: {
  while (true) {
    const tmpIfTest /*:unknown*/ = $(`L1`);
    if (tmpIfTest) {
      $(`S1`);
      while (true) {
        const tmpIfTest$1 /*:unknown*/ = $(`L2`);
        if (tmpIfTest$1) {
          $(`S2`);
          const tmpIfTest$3 /*:unknown*/ = $(`C_break_outer`);
          if (tmpIfTest$3) {
            break outer_label;
          } else {
            $(`S3`);
          }
        } else {
          break;
        }
      }
      $(`S4`);
    } else {
      break;
    }
  }
}
$(`S5`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
outer_label: {
  while (true) {
    if ($(`L1`)) {
      $(`S1`);
      while (true) {
        if ($(`L2`)) {
          $(`S2`);
          if ($(`C_break_outer`)) {
            break outer_label;
          } else {
            $(`S3`);
          }
        } else {
          break;
        }
      }
      $(`S4`);
    } else {
      break;
    }
  }
}
$(`S5`);
`````


## PST Settled
With rename=true

`````js filename=intro
outer_label: {
  while (true) {
    const a = $( "L1" );
    if (a) {
      $( "S1" );
      while (true) {
        const b = $( "L2" );
        if (b) {
          $( "S2" );
          const c = $( "C_break_outer" );
          if (c) {
            break outer_label;
          }
          else {
            $( "S3" );
          }
        }
        else {
          break;
        }
      }
      $( "S4" );
    }
    else {
      break;
    }
  }
}
$( "S5" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
outer_label: {
  while (true) {
    const tmpIfTest = $(`L1`);
    if (tmpIfTest) {
      $(`S1`);
      while (true) {
        const tmpIfTest$1 = $(`L2`);
        if (tmpIfTest$1) {
          $(`S2`);
          const tmpIfTest$3 = $(`C_break_outer`);
          if (tmpIfTest$3) {
            break outer_label;
          } else {
            $(`S3`);
          }
        } else {
          break;
        }
      }
      $(`S4`);
    } else {
      break;
    }
  }
}
$(`S5`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'L1'
 - 2: 'S1'
 - 3: 'L2'
 - 4: 'S2'
 - 5: 'C_break_outer'
 - 6: 'S5'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
