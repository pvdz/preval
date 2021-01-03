# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
for ({ x } = 1;;) y;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
for (objAssignPatternRhs = 1, x = objAssignPatternRhs.x; ; ) {
  y;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
for (objAssignPatternRhs = 1, x = objAssignPatternRhs.x; ; ) {}
`````
