# Preval test case

# try_finally_do_continue.md

> Try > Finally > Try finally do continue
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
do {
  try {
    $(1);
  } finally {
    $(2);
    continue;
  }
} while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE)
$(3);
`````

## Pre Normal

`````js filename=intro
while (true) {
  {
    $continue: {
      {
        {
          let $implicitThrow = false;
          let $finalCatchArg = undefined;
          $finally: {
            try {
              $(1);
            } catch ($finalImplicit) {
              $implicitThrow = true;
              $finalCatchArg = $finalImplicit;
            }
          }
          {
            $(2);
            break $continue;
          }
          if ($implicitThrow) throw $finalCatchArg;
          else {
          }
        }
      }
    }
  }
  if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  } else {
    break;
  }
}
$(3);
`````

## Normalized

`````js filename=intro
while (true) {
  $continue: {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    try {
      $(1);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
    $(2);
    break $continue;
  }
  if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  } else {
    break;
  }
}
$(3);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
try {
  $(1);
} catch ($finalImplicit) {}
$(2);
if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    try {
      $(1);
    } catch ($finalImplicit$1) {}
    $(2);
    if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    } else {
      break;
    }
  }
} else {
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
try {
  $( 1 );
}
catch (b) {

}
$( 2 );
if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    try {
      $( 1 );
    }
catch (c) {

    }
    $( 2 );
    if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {

    }
    else {
      break;
    }
  }
}
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same