# Preval test case

# default_no_no_no__undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x]]) {
  return 'bad';
}
$(f(undefined, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1[0];
  return 'bad';
}
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  arrPatternSplat$1[0];
  return 'bad';
}
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
