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
let y;
{
  objAssignPatternRhs = 1;
  x = objAssignPatternRhs.x;
  let tmpBindingInit = x;
  let ifTestTmp = tmpBindingInit.foo;
  if (ifTestTmp) {
    y;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
let tmpBindingInit = x;
let ifTestTmp = tmpBindingInit.foo;
if (ifTestTmp) {
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: BAD?!
["<crash[ Cannot read property 'foo' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'foo' of undefined ]>"];

