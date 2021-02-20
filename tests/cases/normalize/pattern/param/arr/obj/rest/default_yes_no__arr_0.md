# Preval test case

# default_yes_no__arr_0.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return x;
}
$(f([0, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 'fail' };
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = arrPatternStep;
  const tmpCalleeParam$2 = [];
  const tmpCalleeParam$3 = undefined;
  let x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
  return x;
}
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$5 = [0, 20, 30];
const tmpCalleeParam$6 = 200;
const tmpCalleeParam$4 = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$2(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 'fail' };
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCalleeParam$1 = arrPatternStep;
  const tmpCalleeParam$2 = [];
  const x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$2, undefined);
  return x;
}
const tmpCalleeParam$5 = [0, 20, 30];
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
