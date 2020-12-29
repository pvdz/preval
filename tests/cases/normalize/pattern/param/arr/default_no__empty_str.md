# Preval test case

# default_no__empty_str.md

> normalize > pattern >  > param > arr > default_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([]) {
  return 'ok';
}
$(f('', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'ok';
}
var tmpArg;
tmpArg = f('', 200);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'ok';
$(tmpArg);
`````
