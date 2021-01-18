# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
({ x: a } = 1);
{ let a = 1; }
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
{
  let a = 1;
}
objAssignPatternRhs = 1;
a_1 = objAssignPatternRhs.x;
{
  let a_2 = 1;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
a_1 = objAssignPatternRhs.x;
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
