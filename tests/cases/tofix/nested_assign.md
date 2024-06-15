# Preval test case

# nested_assign.md

> Tofix > Nested assign
>
> The nested assign of $(20) is not observed by x so the assignment can be removed in favor of just the rhs.
> Note that the outer loop doesn't break so the final $(x) is unreachable. Preval knows.

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    if ($(true)) break
  }
  x = $(30);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    if ($(true)) break;
  }
  x = $(30);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  x = $(30);
}
$(x);
`````

## Output


`````js filename=intro
$(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(20);
  const tmpIfTest = $(true);
  if (tmpIfTest) {
  } else {
    while ($LOOP_UNROLL_10) {
      $(20);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  }
  $(30);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 20 );
  const a = $( true );
  if (a) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      $( 20 );
      const b = $( true );
      if (b) {
        break;
      }
    }
  }
  $( 30 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: true
 - 4: 30
 - 5: 20
 - 6: true
 - 7: 30
 - 8: 20
 - 9: true
 - 10: 30
 - 11: 20
 - 12: true
 - 13: 30
 - 14: 20
 - 15: true
 - 16: 30
 - 17: 20
 - 18: true
 - 19: 30
 - 20: 20
 - 21: true
 - 22: 30
 - 23: 20
 - 24: true
 - 25: 30
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
