# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg;
tmpArg = f(null, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg;
tmpArg = f(null, 200);
$(tmpArg);
`````