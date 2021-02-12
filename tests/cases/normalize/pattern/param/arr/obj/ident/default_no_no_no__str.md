# Preval test case

# default_no_no_no__str.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f('abc'));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f('abc');
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
const tmpCalleeParam = f('abc');
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
