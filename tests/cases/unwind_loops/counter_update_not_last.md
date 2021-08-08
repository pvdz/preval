# Preval test case

# counter_update_not_last.md

> Unwind loops > Counter update not last
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
while (test) {
  $(`yolo`);
  test = counter < 10;
  counter = counter + 1;
  $(`oops`);
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
let tmpClusterSSA_test$17 = true;
let tmpClusterSSA_counter$17 = 10;
$(`oops`);
while (tmpClusterSSA_test$17) {
  $(`yolo`);
  tmpClusterSSA_test$17 = tmpClusterSSA_counter$17 < 10;
  tmpClusterSSA_counter$17 = tmpClusterSSA_counter$17 + 1;
  $(`oops`);
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
