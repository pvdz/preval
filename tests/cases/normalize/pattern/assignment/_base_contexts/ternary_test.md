# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 1, b = 2, c = 3;
({ x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
let x = 1;
let b = 2;
let c = 3;
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
let x = 1;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
let ifTestTmp = x;
if (ifTestTmp) {
} else {
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
