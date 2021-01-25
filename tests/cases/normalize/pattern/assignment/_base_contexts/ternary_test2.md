# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x, b, c
({ x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
let x;
let b;
let c;
{
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
  const tmpIfTest = objAssignPatternRhs;
  if (tmpIfTest) {
    b;
  } else {
    c;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
let x;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
const tmpIfTest = objAssignPatternRhs;
if (tmpIfTest) {
} else {
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
