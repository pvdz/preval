# Preval test case

# counter_update_flipped.md

> Unwind loops > Separate test > Counter update flipped
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  test = counter < 10;
  counter = counter + 1;
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
}
`````

## Normalized

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  test = counter < 10;
  counter = counter + 1;
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
let tmpClusterSSA_test$17 = true;
let tmpClusterSSA_counter$17 = 10;
while (tmpClusterSSA_test$17) {
  $(`yolo`);
  tmpClusterSSA_test$17 = tmpClusterSSA_counter$17 < 10;
  tmpClusterSSA_counter$17 = tmpClusterSSA_counter$17 + 1;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
