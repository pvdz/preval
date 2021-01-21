# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1).foo
`````

## Normalized

`````js filename=intro
var tmpMemberComplexObj;
var objAssignPatternRhs;
{
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
  tmpMemberComplexObj = objAssignPatternRhs;
  tmpMemberComplexObj.foo;
}
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
tmpMemberComplexObj = objAssignPatternRhs;
tmpMemberComplexObj.foo;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
