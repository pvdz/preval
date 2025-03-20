# Preval test case

# infinite_loops.md

> While > Infinite loops

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) { // infinite
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x); // <- DCE me


/*
// SSA
{
  let x = 1;
  function $continue1(x) {
    function $continue2(x) {
      if ($) {
        $(x); // Can still see 2 due to outer loop
      } else {
        $(x);
        x = 2;
        $break2(x);
        return;
      }
      $continue2(x);
      return;
    }
    function $break2(x) {
      $continue1(x);
      return;
    }
    $continue2(x);
    return;
  }
  function $break1() {
    $(x);
  }
  $continue1(x);
}


// Reduction
{
  function $continue2(x) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
      $continue2(x);
    } else {
      $(x);
      $continue2(2);
    }
  }
  $continue2(1);
}

// Recompile
{
  let x = 1;
  while (true) {
    $(x); // Can still see 2 due to outer loop
    if ($) {
    } else {
      x = 2;
    }
  }
}
*/
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


## Todos triggered


- Support this node type in isFree: LabeledStatement


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
