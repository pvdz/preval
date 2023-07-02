# Preval test case

# do_expr_test.md

> Normalize > Expressions > Do expr test
>
> Testing simple pattern normalizations

The while-body should be normalized before the while-test gets inlined...

## Input

`````js filename=intro
let a = 1, x = 3, y = 4;
do $(a); while (x + y);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  x = 3,
  y = 4;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    $(a);
    tmpDoWhileFlag = x + y;
  }
}
`````

## Normalized

`````js filename=intro
let a = 1;
let x = 3;
let y = 4;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(a);
  tmpDoWhileFlag = x + y;
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
