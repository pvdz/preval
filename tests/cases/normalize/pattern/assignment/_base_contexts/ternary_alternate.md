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
var objAssignPatternRhs;
{
  if (a) {
    b;
  } else {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
    objAssignPatternRhs;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
if (a) {
} else {
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
