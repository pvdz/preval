# Preval test case

# default_yes_no__arr_null.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')]) {
  return x;
}
$(f([null, 201], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = null;
const tmpCalleeParam$1 = [tmpArrElement, 201];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
const tmpCallCallee$1 = f;
const tmpArrElement = null;
const tmpCalleeParam$1 = [tmpArrElement, 201];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
