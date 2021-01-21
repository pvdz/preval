# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x: a } = 1)
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
a = objAssignPatternRhs.x;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
a = objAssignPatternRhs.x;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
