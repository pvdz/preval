# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
do { a; b; } while (x + y);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
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
  ifTestTmp = x + y;
} while (ifTestTmp);
`````
