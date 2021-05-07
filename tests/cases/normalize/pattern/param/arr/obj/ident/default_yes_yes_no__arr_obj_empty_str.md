# Preval test case

# default_yes_yes_no__arr_obj_empty_str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  arr obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })]) {
  return x;
}
$(f([{ x: '', y: 2, z: 3 }, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $('fail') } = $({ x: 'fail2' })] = tmpParamBare;
  return x;
};
$(f([{ x: '', y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 'fail2' };
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpArrElement = { x: '', y: 2, z: 3 };
const tmpCalleeParam$3 = [tmpArrElement, 20, 30];
const tmpCalleeParam$5 = 200;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { x: 'fail2' };
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const objPatternBeforeDefault = arrPatternStep.x;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpSSA_x = $('fail');
    return tmpSSA_x;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpArrElement = { x: '', y: 2, z: 3 };
const tmpCalleeParam$3 = [tmpArrElement, 20, 30];
const tmpCalleeParam$1 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$1);
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
