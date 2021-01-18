# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
f({ x } = 1);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var objAssignPatternRhs;
objAssignPatternRhs = 1;
tmpNestedComplexRhs = objAssignPatternRhs.x;
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
f(tmpArg);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var objAssignPatternRhs;
objAssignPatternRhs = 1;
tmpNestedComplexRhs = objAssignPatternRhs.x;
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
f(tmpArg);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
