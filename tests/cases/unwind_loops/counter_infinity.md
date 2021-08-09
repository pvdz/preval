# Preval test case

# counter_infinity.md

> Unwind loops > Counter infinity
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
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Output

`````js filename=intro
let counter = Infinity;
let test = true;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
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