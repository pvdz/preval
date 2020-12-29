# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

#TODO

## Input

`````js filename=intro
function i({x: [ y ]}) { return y }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  return y;
}
`````

## Output

`````js filename=intro

`````
