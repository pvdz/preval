# Preval test case

# default_no__null.md

> normalize > pattern >  > param > arr > rest > default_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x]) {
  return 'bad';
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 200);
$(tmpArg);
`````