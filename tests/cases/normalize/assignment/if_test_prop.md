# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1).foo) y;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
let y;
{
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
  let tmpBindingInit = 1;
  let ifTestTmp = tmpBindingInit.foo;
  if (ifTestTmp) {
    y;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
{
  x = 8;
  x = x.x;
  var x = 8;
  var x = x.x;
  if (x) {
    x;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
let ifTestTmp = (1).foo;
if (ifTestTmp) {
}
`````
