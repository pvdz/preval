# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

The while-body should be normalized before the while-test gets inlined...

## Input

`````js filename=intro
do a; while (x + y);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
do {
  a;
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
