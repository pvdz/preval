# Preval test case

# default_yes_yes_yes__arr_obj_empty_str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: '', y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { x: 'fail3' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
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
    x = $('fail');
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpArrElement$1 = { x: '', y: 2, z: 3 };
const tmpCalleeParam$3 = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$4 = 200;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { x: 'fail3' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
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
    const SSA_x = $('fail');
    return SSA_x;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpArrElement$1 = { x: '', y: 2, z: 3 };
const tmpCalleeParam$3 = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
