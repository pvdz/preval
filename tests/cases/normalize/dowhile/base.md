# Preval test case

# base.md

> Normalize > Dowhile > Base
>
> We transform do-while to regular while

#TODO

## Input

`````js filename=intro
do {
  $(1);
} while ($(2));
`````

## Pre Normal

`````js filename=intro
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(1);
    }
    tmpDoWhileFlag = $(2);
  }
}
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(1);
    tmpDoWhileFlag = $(2);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(1);
let tmpDoWhileFlag = $(2);
const $tmpLoopUnrollCheck = tmpDoWhileFlag;
if (tmpDoWhileFlag) {
  $(1);
  tmpDoWhileFlag = $(2);
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(1);
      tmpDoWhileFlag = $(2);
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
let a = $( 2 );
const b = a;
if (a) {
  $( 1 );
  a = $( 2 );
}
if (b) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      $( 1 );
      a = $( 2 );
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
