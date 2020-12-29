# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y = a ]}) { return y }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = a;
  }
  return y;
}
`````

## Output

`````js filename=intro

`````
