# Preval test case

# default_no__str.md

> normalize > pattern >  > param > arr > rest > default_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x]) {
  return x;
}
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat.slice(0);
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
  let x = arrPatternSplat.slice(0);
  return x;
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: ["a","b","c"]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
