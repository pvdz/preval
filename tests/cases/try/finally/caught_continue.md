# Preval test case

# caught_continue.md

> Try > Finally > Caught continue
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(2);
    if ($(3)) {
      continue; // should not be trapped by the finally
    }
    $(4);
  }
} finally {
  $(5);
}
`````

## Pre Normal


`````js filename=intro
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        $continue: {
          {
            $(2);
            if ($(3)) {
              break $continue;
            }
            $(4);
          }
        }
      }
    } catch ($finalImplicit) {
      $(5);
      throw $finalImplicit;
    }
  }
  {
    $(5);
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
`````

## Normalized


`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $continue: {
      $(2);
      const tmpIfTest = $(3);
      if (tmpIfTest) {
        break $continue;
      } else {
        $(4);
      }
    }
  }
} catch ($finalImplicit) {
  $(5);
  throw $finalImplicit;
}
$(5);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## Output


`````js filename=intro
try {
  $(1);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(2);
    const tmpIfTest = $(3);
    if (tmpIfTest) {
    } else {
      $(4);
    }
  }
  throw `[preval] unreachable; infinite loop`;
} catch ($finalImplicit) {
  $(5);
  throw $finalImplicit;
}
$(5);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 2 );
    const a = $( 3 );
    if (a) {

    }
    else {
      $( 4 );
    }
  }
  throw "[preval] unreachable; infinite loop";
}
catch (b) {
  $( 5 );
  throw b;
}
$( 5 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 2
 - 5: 3
 - 6: 2
 - 7: 3
 - 8: 2
 - 9: 3
 - 10: 2
 - 11: 3
 - 12: 2
 - 13: 3
 - 14: 2
 - 15: 3
 - 16: 2
 - 17: 3
 - 18: 2
 - 19: 3
 - 20: 2
 - 21: 3
 - 22: 2
 - 23: 3
 - 24: 2
 - 25: 3
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
