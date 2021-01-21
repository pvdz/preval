# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
({ x } = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
let x = 10;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
objAssignPatternRhs;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
let x = 10;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
