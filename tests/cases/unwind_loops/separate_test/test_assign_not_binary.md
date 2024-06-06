# Preval test case

# test_assign_not_binary.md

> Unwind loops > Separate test > Test assign not binary
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = !counter;
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = !counter;
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
    test = !counter;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(`yolo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "yolo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'yolo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
