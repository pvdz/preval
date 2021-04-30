# Preval test case

# default_yes_yes__arr_elided.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([, , , , 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'pass' })] = tmpParamBare === undefined ? $([{ a: 'fail2' }]) : tmpParamBare;
  return x;
};
$(f([, , , , 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { a: 'fail2' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'pass' };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCallCallee$3 = objPatternRest;
  const tmpCalleeParam$3 = arrPatternStep;
  const tmpCalleeParam$5 = [];
  const tmpCalleeParam$7 = undefined;
  let x = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  return x;
};
const tmpCallCallee$5 = $;
const tmpCallCallee$7 = f;
const tmpCalleeParam$11 = [, , , , 20, 30];
const tmpCalleeParam$13 = 200;
const tmpCalleeParam$9 = tmpCallCallee$7(tmpCalleeParam$11, tmpCalleeParam$13);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpCalleeParam$11 = [, , , , 20, 30];
let bindingPatternArrRoot = undefined;
const tmpIfTest = tmpCalleeParam$11 === undefined;
if (tmpIfTest) {
  const tmpArrElement = { a: 'fail2' };
  const tmpCalleeParam = [tmpArrElement];
  bindingPatternArrRoot = $(tmpCalleeParam);
} else {
  bindingPatternArrRoot = tmpCalleeParam$11;
}
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = { a: 'pass' };
  arrPatternStep = $(tmpCalleeParam$1);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCalleeParam$3 = arrPatternStep;
const tmpCalleeParam$5 = [];
const x = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
