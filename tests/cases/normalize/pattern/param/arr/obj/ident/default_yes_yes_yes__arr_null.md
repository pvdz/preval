# Preval test case

# default_yes_yes_yes__arr_null.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [{ x = $('pass') } = $({ x: 'fail2' })] = tmpParamDefault === undefined ? $([{ x: 'fail3' }]) : tmpParamDefault;
  return 'bad';
};
$(f([null, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { x: 'fail3' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: 'fail2' };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$2 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    x = $('pass');
    return 'bad';
  } else {
    x = objPatternBeforeDefault;
    return 'bad';
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = [null, 20, 30];
const tmpCalleeParam$4 = 200;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { x: 'fail3' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { x: 'fail2' };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const objPatternBeforeDefault = arrPatternStep.x;
  const tmpIfTest$2 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    $('pass');
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam$3 = [null, 20, 30];
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
