# Preval test case

# base.md

> Free > Free loops > Base
>
>

## Input

`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  arr.push(counter);
  counter = counter + 1;
  const test = counter > 20;
  if (test) {
    break;
  } else {
  }
}
$(arr);
`````

## Pre Normal


`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  arr.push(counter);
  counter = counter + 1;
  const test = counter > 20;
  if (test) {
    break;
  } else {
  }
}
$(arr);
`````

## Normalized


`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  arr.push(counter);
  counter = counter + 1;
  const test = counter > 20;
  if (test) {
    break;
  } else {
  }
}
$(arr);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
