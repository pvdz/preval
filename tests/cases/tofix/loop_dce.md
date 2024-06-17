# Preval test case

# loop_dce.md

> Tofix > Loop dce
>
> if

We should be able to detect dead code like this.
When no code path can reach some statement it should be considered dead.
That's currently not the case.

Also, the loop-label-loop-breaktolabel pattern can be simplified I think? TBD

## Input

`````js filename=intro
let x = 1;
again: while (true) {
  while (true) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      continue again;
    }
  }
  // the loop never breaks and the continue always skips over this. 
  // if anything it's dead code and should be eliminated 
  $('fail', x); // unreachable code
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
again: while (true) {
  $continue: {
    {
      while (true) {
        if ($) {
          $(x);
        } else {
          $(x);
          x = 2;
          break $continue;
        }
      }
      $(`fail`, x);
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 1;
while (true) {
  $continue: {
    while (true) {
      if ($) {
        $(x);
      } else {
        $(x);
        x = 2;
        break $continue;
      }
    }
    $(`fail`, x);
  }
}
$(x);
`````

## Output


`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    while (true) {
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
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue:   {
    while (true) {
      $( a );
      if ($) {

      }
      else {
        a = 2;
        break $continue;
      }
    }
    $( "fail", a );
  }
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

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

Final output calls: Same
