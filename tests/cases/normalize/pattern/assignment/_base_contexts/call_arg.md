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
var tmpArg;
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
tmpArg = objAssignPatternRhs;
f(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
tmpArg = objAssignPatternRhs;
f(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
