# Preval test case

# infinite_loops2.md

> Tofix > Infinite loops2
>
> If a loop has no break, continue, throw, or return then it is an infinite loop... Is that relevant? DCE the tail, for example.

(this one is not a reftest)

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) { // infinite
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
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
    if ($) {
      $(x); // Can still see 2 due to outer loop
    } else {
      $(x);
      x = 2;
    }
  }
}
*/
`````

## Pre Normal


`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x);
`````

## Output


`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
    $(x);
    if ($) {
    } else {
      x = 2;
      break;
    }
  }
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE_5) {
    $( a );
    if ($) {

    }
    else {
      a = 2;
      break;
    }
  }
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

BAD@! Found 1 implicit global bindings:

$LOOP_DONE_UNROLLING_ALWAYS_TRUE_5

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
