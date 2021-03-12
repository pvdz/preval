# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = ['fail2'];
    const tmpCalleeParam = { x: tmpObjLitVal };
    $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = tmpParamDefault;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail'];
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(undefined, 10);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = ['fail2'];
    const tmpCalleeParam = { x: tmpObjLitVal };
    $tdz$__pattern_after_default = $(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = tmpParamDefault;
  }
  const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = ['fail'];
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  [...objPatternAfterDefault];
  return 'ok';
};
const tmpCalleeParam$2 = f(undefined, 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '["fail2"]' }
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
