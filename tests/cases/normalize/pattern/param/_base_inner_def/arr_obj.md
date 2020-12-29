# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

#TODO

## Input

`````js filename=intro
function h([{ x = a }]) { return x}
`````

## Normalized

`````js filename=intro
function h(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = a;
  }
  return x;
}
`````

## Output

`````js filename=intro

`````
