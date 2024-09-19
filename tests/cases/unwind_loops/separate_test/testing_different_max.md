# Preval test case

# testing_different_max.md

> Unwind loops > Separate test > Testing different max
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 20;
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 20;
}
`````

## Normalized


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    test = counter < 20;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
let tmpClusterSSA_counter$2 /*:number*/ = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`yolo`);
  tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 + 1;
  const tmpClusterSSA_test$1 /*:boolean*/ = tmpClusterSSA_counter$2 < 20;
  if (tmpClusterSSA_test$1) {
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
let a = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "yolo" );
  a = a + 1;
  const b = a < 20;
  if (b) {

  }
  else {
    break;
  }
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
