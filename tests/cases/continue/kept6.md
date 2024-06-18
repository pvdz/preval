# Preval test case

# kept6.md

> Continue > Kept6
>
> Regression

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const test = $(1);
      if (test) {
        break again;
      } else {}
    }
  }
}
$(2);
`````

## Pre Normal


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const test = $(1);
      if (test) {
        break again;
      } else {
      }
    }
  }
}
$(2);
`````

## Normalized


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const test = $(1);
    if (test) {
      break nestedLoop;
    } else {
    }
  }
}
$(2);
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
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
