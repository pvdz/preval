# Preval test case

# test_init_not_binary.md

> Unwind loops > Separate test > Test init not binary
>
> Unrolling loops

#TODO

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
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
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
let tmpClusterSSA_counter$17 = 10;
let tmpClusterSSA_test$17 = false;
while (tmpClusterSSA_test$17) {
  $(`yolo`);
  tmpClusterSSA_counter$17 = tmpClusterSSA_counter$17 + 1;
  tmpClusterSSA_test$17 = tmpClusterSSA_counter$17 < 10;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
