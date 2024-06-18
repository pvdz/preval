# Preval test case

# test_init_not_binary.md

> Unwind loops > Separate test > Test init not binary
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = !counter;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = !counter;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Normalized


`````js filename=intro
let counter = 0;
let test = !counter;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
