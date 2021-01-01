# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x = b } = 1);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? b : objPatternBeforeDefault;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? b : objPatternBeforeDefault;
`````
