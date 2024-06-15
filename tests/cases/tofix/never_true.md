# Preval test case

# never_true.md

> Tofix > Never true

Preval should be able to detect that the test is never updated here.

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  test = counter < 10;
  counter = counter + 1;
  $('oops');
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  test = counter < 10;
  counter = counter + 1;
  $(`oops`);
}
`````

## Normalized


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (true) {
  if (test) {
    $(`yolo`);
    test = counter < 10;
    counter = counter + 1;
    $(`oops`);
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
$(`oops`);
$(`yolo`);
let tmpClusterSSA_test$2 = false;
let tmpClusterSSA_counter$2 = 11;
$(`oops`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpClusterSSA_test$2) {
    $(`yolo`);
    tmpClusterSSA_test$2 = tmpClusterSSA_counter$2 < 10;
    tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 + 1;
    $(`oops`);
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
$( "oops" );
$( "yolo" );
let a = false;
let b = 11;
$( "oops" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (a) {
    $( "yolo" );
    a = b < 10;
    b = b + 1;
    $( "oops" );
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
 - 2: 'oops'
 - 3: 'yolo'
 - 4: 'oops'
 - 5: 'yolo'
 - 6: 'oops'
 - 7: 'yolo'
 - 8: 'oops'
 - 9: 'yolo'
 - 10: 'oops'
 - 11: 'yolo'
 - 12: 'oops'
 - 13: 'yolo'
 - 14: 'oops'
 - 15: 'yolo'
 - 16: 'oops'
 - 17: 'yolo'
 - 18: 'oops'
 - 19: 'yolo'
 - 20: 'oops'
 - 21: 'yolo'
 - 22: 'oops'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
