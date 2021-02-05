# Preval test case

# default_yes_no_no__arr_null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return 'bad';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = null;
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return 'bad';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [null, 20, 30];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
