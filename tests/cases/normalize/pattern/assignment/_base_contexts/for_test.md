# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
for ({ x } = 1;false;) y;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
{
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
  objAssignPatternRhs;
  while (false) {
    y;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
while (false) {}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
