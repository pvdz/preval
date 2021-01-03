# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

The while-body should be normalized before the while-test gets inlined...

## Input

`````js filename=intro
let a = 1, x = 3, y = 4;
do a; while (x + y);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
let a = 1;
let x = 3;
let y = 4;
do {
  a;
  ifTestTmp = x + y;
} while (ifTestTmp);
`````

## Output

`````js filename=intro
var ifTestTmp;
do {
  ifTestTmp = 7;
} while (ifTestTmp);
`````
