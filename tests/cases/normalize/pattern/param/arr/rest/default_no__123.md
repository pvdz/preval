# Preval test case

# default_no__123.md

> normalize > pattern >  > param > arr > rest > default_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x]) {
  return 'bad';
}
$(f(1, 2, 3, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg;
tmpArg = f(1, 2, 3, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'bad';
}
var tmpArg;
tmpArg = f(1, 2, 3, 200);
$(tmpArg);
`````