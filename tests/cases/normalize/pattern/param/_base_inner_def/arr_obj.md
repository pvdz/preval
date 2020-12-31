# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x = a }]) { return x}
`````

## Normalized

`````js filename=intro
function h(tmpParamPattern) {
  var tmpTernaryTest;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? a : objPatternBeforeDefault;
  return x;
}
`````

## Output

`````js filename=intro

`````
