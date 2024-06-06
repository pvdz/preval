# Preval test case

# counter_infinity.md

> Unwind loops > Separate test > Counter infinity
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = Infinity;
let test = counter >= 0;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
`````

## Pre Normal


`````js filename=intro
let counter = Infinity;
let test = counter >= 0;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Normalized


`````js filename=intro
let counter = Infinity;
let test = counter >= 0;
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
