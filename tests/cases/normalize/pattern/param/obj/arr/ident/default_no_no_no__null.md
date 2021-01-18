# Preval test case

# default_no_no_no__null.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y] }) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'x' of null ]>"];

Normalized calls: Same

Final output calls: Same
