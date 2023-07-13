# Preval test case

# do_block_test.md

> Normalize > Expressions > Do block test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = 2, x = 3, y = 4;
do { $(a); b; } while (x + y);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = 2,
  x = 3,
  y = 4;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(a);
      null;
    }
    tmpDoWhileFlag = x + y;
  }
}
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let x = 3;
let y = 4;
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(a);
    tmpDoWhileFlag = x + y;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
