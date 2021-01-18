# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > arr > ident > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x]) {
  return x;
}
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat[0];
  return x;
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat[0];
  return x;
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
[['a'], null];

Normalized calls: Same

Final output calls: Same
