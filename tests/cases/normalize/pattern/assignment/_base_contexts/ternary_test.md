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
x = objAssignPatternRhs.x;
tmpTernaryTest = x;
tmpTernaryTest ? b : c;
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = 8;
x = x.x;
x = x;
x ? x : x;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
var tmpTernaryTest;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
tmpTernaryTest = x;
tmpTernaryTest ? b : c;
`````
