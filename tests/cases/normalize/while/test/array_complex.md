# Preval test case

# array_complex.md

> Normalize > While > Test > Array complex
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ([$(1), $(2), $(3)]) {
  $('loop');
}
$('after');
`````

## Pre Normal


`````js filename=intro
while ([$(1), $(2), $(3)]) {
  $(`loop`);
}
$(`after`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = $(2);
  const tmpArrElement$3 = $(3);
  const tmpIfTest = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
  if (tmpIfTest) {
    $(`loop`);
  } else {
    break;
  }
}
$(`after`);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(3);
$(`loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(2);
  $(3);
  $(`loop`);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 2 );
  $( 3 );
  $( "loop" );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 'loop'
 - 5: 1
 - 6: 2
 - 7: 3
 - 8: 'loop'
 - 9: 1
 - 10: 2
 - 11: 3
 - 12: 'loop'
 - 13: 1
 - 14: 2
 - 15: 3
 - 16: 'loop'
 - 17: 1
 - 18: 2
 - 19: 3
 - 20: 'loop'
 - 21: 1
 - 22: 2
 - 23: 3
 - 24: 'loop'
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
