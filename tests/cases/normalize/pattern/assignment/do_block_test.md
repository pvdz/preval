# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = [10, 20], x = 3, y = 4, p, q;
do { [p, q] = $(b); } while (x + y);
$(p, q);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = [10, 20];
let x = 3;
let y = 4;
let p;
let q;
let tmpDoWhileTest;
do {
  const arrAssignPatternRhs = $(b);
  const arrPatternSplat = [...arrAssignPatternRhs];
  p = arrPatternSplat[0];
  q = arrPatternSplat[1];
  arrAssignPatternRhs;
  tmpDoWhileTest = x + y;
} while (tmpDoWhileTest);
$(p, q);
`````

## Output

`````js filename=intro
let b = [10, 20];
let p;
let q;
let tmpDoWhileTest;
do {
  const arrAssignPatternRhs = $(b);
  const arrPatternSplat = [...arrAssignPatternRhs];
  p = arrPatternSplat[0];
  q = arrPatternSplat[1];
  tmpDoWhileTest = 7;
} while (tmpDoWhileTest);
$(p, q);
`````

## Result

Should call `$` with:
 - 1: [10, 20]
 - 2: [10, 20]
 - 3: [10, 20]
 - 4: [10, 20]
 - 5: [10, 20]
 - 6: [10, 20]
 - 7: [10, 20]
 - 8: [10, 20]
 - 9: [10, 20]
 - 10: [10, 20]
 - 11: [10, 20]
 - 12: [10, 20]
 - 13: [10, 20]
 - 14: [10, 20]
 - 15: [10, 20]
 - 16: [10, 20]
 - 17: [10, 20]
 - 18: [10, 20]
 - 19: [10, 20]
 - 20: [10, 20]
 - 21: [10, 20]
 - 22: [10, 20]
 - 23: [10, 20]
 - 24: [10, 20]
 - 25: [10, 20]
 - 26: [10, 20]
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
