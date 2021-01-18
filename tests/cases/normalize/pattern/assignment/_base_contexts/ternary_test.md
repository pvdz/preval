# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
{
  {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
    let ifTestTmp = x;
    if (ifTestTmp) {
      b;
    } else {
      c;
    }
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
let ifTestTmp = x;
if (ifTestTmp) {
} else {
}
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: BAD!!
[null];

