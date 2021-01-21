# Preval test case

# default_no_no_no__empty.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x }]) {
  return 'bad';
}
$(f());
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return 'bad';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  arrPatternStep.x;
  return 'bad';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
