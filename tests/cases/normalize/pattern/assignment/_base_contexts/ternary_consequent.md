# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? ({ x } = 1) : c;
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var objAssignPatternRhs;
var x;
a ? ((objAssignPatternRhs = 1), (x = objAssignPatternRhs.x), (tmpTernaryConsequent = x), tmpTernaryConsequent) : c;
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x ? ((x = 8), (x = x.x), (x = x), x) : x;
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var objAssignPatternRhs;
var x;
a ? ((objAssignPatternRhs = 1), (x = objAssignPatternRhs.x), (tmpTernaryConsequent = x), tmpTernaryConsequent) : c;
`````
