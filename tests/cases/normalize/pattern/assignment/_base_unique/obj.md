# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
({ x } = 1);
{ let x = 1; }
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
{
  let x = 1;
}
objAssignPatternRhs = 1;
x_1 = objAssignPatternRhs.x;
{
  let x_2 = 1;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x_1 = objAssignPatternRhs.x;
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
