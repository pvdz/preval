# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

The while-body should be normalized before the while-test gets inlined...

## Input

`````js filename=intro
let a = 1, x = 3, y = 4;
do $(a); while (x + y);
`````

## Normalized

`````js filename=intro
let a = 1;
let x = 3;
let y = 4;
let tmpDoWhileTest;
do {
  $(a);
  tmpDoWhileTest = x + y;
} while (tmpDoWhileTest);
`````

## Output

`````js filename=intro
let tmpDoWhileTest;
do {
  $(1);
  tmpDoWhileTest = 7;
} while (tmpDoWhileTest);
`````

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

Normalized calls: Same

Final output calls: Same
