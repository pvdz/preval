# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f('abc', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [{ ...x } = $({ a: 'fail' })] = tmpParamDefault === undefined ? $([{ a: 'fail2' }]) : tmpParamDefault;
  return x;
};
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { a: 'fail2' };
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
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCallCallee$2 = objPatternRest;
  const tmpCalleeParam$2 = arrPatternStep;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$4 = undefined;
  let x = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
  return x;
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$5 = f('abc', 200);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { a: 'fail2' };
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
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCalleeParam$2 = arrPatternStep;
  const tmpCalleeParam$3 = [];
  const x = objPatternRest(tmpCalleeParam$2, tmpCalleeParam$3, undefined);
  return x;
};
const tmpCalleeParam$5 = f('abc', 200);
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
