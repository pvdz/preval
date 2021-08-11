# Preval test case

# first_test_write_not_var.md

> Unwind loops > Separate test > First test write not var
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
let counter = 0;
let test = counter < 10;
`````

## Pre Normal

`````js filename=intro
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
let counter = 0;
let test = counter < 10;
`````

## Normalized

`````js filename=intro
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
let counter = 0;
let test = counter < 10;
`````

## Output

`````js filename=intro
throw `Preval: Cannot access \`test\` before initialization`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
