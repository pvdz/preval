# Preval test case

# loop_dce.md

> Tofix > loop dce

The call with "fail" is unreachable because the break jumps over it.
We should detect unreachable statements and prune them.

The loop-label-loop-breaktolabel pattern can be simplified I think? TBD

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      $(x);
      if ($) {
      } else {
        x = 2;
        break $continue;
      }
    }
    $(`fail`, x);
  }
}
`````

## Settled


`````js filename=intro
let x /*:number*/ = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  if ($) {
  } else {
    x = 2;
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
while (true) {
  $(x);
  if (!$) {
    x = 2;
  }
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      $(x);
      if ($) {
      } else {
        x = 2;
        break $continue;
      }
    }
    $(`fail`, x);
  }
}
`````

## Normalized


`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    $(x);
    if ($) {
    } else {
      x = 2;
      break nestedLoop;
    }
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  if ($) {

  }
  else {
    a = 2;
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
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
- Support this node type in isFree: LabeledStatement