# Preval test case

# testing_different_counters.md

> Unwind loops > Separate test > Testing different counters
>
> Unrolling loops

## Input

`````js filename=intro
let counter1 = 0;
let counter2 = 0;
let test = counter1 < 10;
while (test) {
  $('yolo');
  counter1 = counter1 + 1;
  test = counter2 < 10;
}
`````

## Pre Normal


`````js filename=intro
let counter1 = 0;
let counter2 = 0;
let test = counter1 < 10;
while (test) {
  $(`yolo`);
  counter1 = counter1 + 1;
  test = counter2 < 10;
}
`````

## Normalized


`````js filename=intro
let counter1 = 0;
let counter2 = 0;
let test = counter1 < 10;
while (true) {
  if (test) {
    $(`yolo`);
    counter1 = counter1 + 1;
    test = counter2 < 10;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
let counter1 = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`yolo`);
  counter1 = counter1 + 1;
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "yolo" );
  a = a + 1;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'yolo'
 - 2: 'yolo'
 - 3: 'yolo'
 - 4: 'yolo'
 - 5: 'yolo'
 - 6: 'yolo'
 - 7: 'yolo'
 - 8: 'yolo'
 - 9: 'yolo'
 - 10: 'yolo'
 - 11: 'yolo'
 - 12: 'yolo'
 - 13: 'yolo'
 - 14: 'yolo'
 - 15: 'yolo'
 - 16: 'yolo'
 - 17: 'yolo'
 - 18: 'yolo'
 - 19: 'yolo'
 - 20: 'yolo'
 - 21: 'yolo'
 - 22: 'yolo'
 - 23: 'yolo'
 - 24: 'yolo'
 - 25: 'yolo'
 - 26: 'yolo'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
