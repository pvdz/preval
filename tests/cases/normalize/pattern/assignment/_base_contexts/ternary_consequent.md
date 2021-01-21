# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? ({ x } = 1) : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
{
  if (a) {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
  } else {
    c;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
if (a) {
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
} else {
}
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: BAD!!
[null];

