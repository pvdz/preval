# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let y = 1; }
const {x: [ y ]} = 1;
{ let y = 1; }
`````

## Normalized

`````js filename=intro
{
  let y_1 = 1;
}
const bindingPatternObjRoot = 1,
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  y = arrPatternSplat[0];
{
  let y_2 = 1;
}
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
`````
