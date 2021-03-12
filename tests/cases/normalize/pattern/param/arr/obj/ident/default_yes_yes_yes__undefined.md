# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'pass3' }])) {
  return x;
}
$(f(undefined));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { x: 'pass3' };
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
    x = $('pass');
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(undefined);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { x: 'pass3' };
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
    const SSA_x = $('pass');
    return SSA_x;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpCalleeParam$2 = f(undefined);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [{ x: '"pass3"' }]
 - 2: 'pass3'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
