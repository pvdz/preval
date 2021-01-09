# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; } 
const [ x ] = 1;
{ let x = 1; }
`````

## Normalized

`````js filename=intro
{
  let x_1 = 1;
}
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
{
  let x_2 = 1;
}
`````

## Uniformed

`````js filename=intro
{
  var x = 8;
}
var x = 8;
var x = [...x];
var x = x[8];
{
  var x = 8;
}
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
arrPatternSplat[0];
`````
