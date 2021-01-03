# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? b : ({ x } = 1);
`````

## Normalized

`````js filename=intro
var tmpTernaryAlternate;
var objAssignPatternRhs;
var x;
a ? b : ((objAssignPatternRhs = 1), (x = objAssignPatternRhs.x), (tmpTernaryAlternate = x), tmpTernaryAlternate);
`````

## Output

`````js filename=intro
var tmpTernaryAlternate;
var objAssignPatternRhs;
var x;
a ? b : ((objAssignPatternRhs = 1), (x = objAssignPatternRhs.x), (tmpTernaryAlternate = x), tmpTernaryAlternate);
`````
