# Preval test case

# labeled_continue.md

> Labels > Continue > Labeled continue
>
>

## Input

`````js filename=intro
let x = $(1);
A: while (true) {
  while (true) {
    $(x);
    x = $(2);
    if ($) {
      continue A;
    }
    x = $(3);
    $(x);
    break;
  }
}
$(x); // unreachable
`````

## Pre Normal


`````js filename=intro
let x = $(1);
A: while (true) {
  $continue: {
    {
      while (true) {
        $(x);
        x = $(2);
        if ($) {
          break $continue;
        }
        x = $(3);
        $(x);
        break;
      }
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(1);
while (true) {
  unlabeledBreak: {
    $(x);
    x = $(2);
    if ($) {
      break unlabeledBreak;
    } else {
      x = $(3);
      $(x);
      break unlabeledBreak;
    }
  }
}
$(x);
`````

## Output


`````js filename=intro
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  x = $(2);
  if ($) {
  } else {
    x = $(3);
    $(x);
  }
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  a = $( 2 );
  if ($) {

  }
  else {
    a = $( 3 );
    $( a );
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
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
