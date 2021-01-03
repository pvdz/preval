# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
var tmpTernaryTest;
objAssignPatternRhs = 1;
tmpTernaryTest = x = objAssignPatternRhs.x;
tmpTernaryTest ? b : c;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
var tmpTernaryTest;
objAssignPatternRhs = 1;
tmpTernaryTest = x = objAssignPatternRhs.x;
tmpTernaryTest ? b : c;
`````
