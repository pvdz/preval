# Preval test case

# default_yes_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Ident > Default yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')]) {
  return x;
}
$(f(['', 201], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [x = $('pass')] = tmpParamPattern;
  return x;
};
$(f(['', 201], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
    return x;
  } else {
    x = arrPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = ['', 201];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const SSA_x = $('pass');
    return SSA_x;
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpCalleeParam$1 = ['', 201];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
