# Preval test case

# counter_nan.md

> Unwind loops > Counter nan
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = NaN;
let test = counter >= 0;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
`````

## Pre Normal

`````js filename=intro
let counter = NaN;
let test = counter >= 0;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Normalized

`````js filename=intro
let counter = NaN;
let test = counter >= 0;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Output

`````js filename=intro
let counter = NaN;
let test = false;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
