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
a ? ((objAssignPatternRhs = 1), (tmpTernaryConsequent = x = objAssignPatternRhs.x), tmpTernaryConsequent) : c;
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var objAssignPatternRhs;
var x;
a ? ((objAssignPatternRhs = 1), (tmpTernaryConsequent = x = objAssignPatternRhs.x), tmpTernaryConsequent) : c;
`````
