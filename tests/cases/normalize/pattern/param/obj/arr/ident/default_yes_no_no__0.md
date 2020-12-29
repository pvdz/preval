# Preval test case

# default_yes_no_no__0.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] }) {
  return 'bad';
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = 'fail';
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = 'fail';
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 10);
$(tmpArg);
`````
