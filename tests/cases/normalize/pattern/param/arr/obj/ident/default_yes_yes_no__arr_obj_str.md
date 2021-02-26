# Preval test case

# default_yes_yes_no__arr_obj_str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  arr obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })]) {
  return x;
}
$(f([{ x: 'abc', y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
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
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpArrElement = { x: 'abc', y: 2, z: 3 };
const tmpCalleeParam$2 = [tmpArrElement, 20, 30];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
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
  let x = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
};
const tmpArrElement = { x: 'abc', y: 2, z: 3 };
const tmpCalleeParam$2 = [tmpArrElement, 20, 30];
const tmpCalleeParam$1 = f(tmpCalleeParam$2, 200);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
