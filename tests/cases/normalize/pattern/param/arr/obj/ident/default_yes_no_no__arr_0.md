# Preval test case

# default_yes_no_no__arr_0.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return x;
}
$(f([0, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{ x = $('pass') }] = tmpParamPattern;
  return x;
};
$(f([0, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [0, 20, 30];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  const objPatternBeforeDefault = arrPatternStep.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const SSA_x = $('pass');
    return SSA_x;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpCalleeParam$1 = [0, 20, 30];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
