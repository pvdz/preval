# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = 2, x = 3, y = 4;
do { a; b; } while (x + y);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
let a = 1;
let b = 2;
let x = 3;
let y = 4;
do {
  a;
  b;
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
