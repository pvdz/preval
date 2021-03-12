# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) } = $({ x: ['fail2'] })) {
  return y;
}
$(f('', 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: [...y] = $(['pass']) } = tmpParamDefault === undefined ? $({ x: ['fail2'] }) : tmpParamDefault;
  return y;
};
$(f('', 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = ['fail2'];
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['pass'];
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f('', 10);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = ['fail2'];
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  const objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = ['pass'];
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const arrPatternSplat = [...objPatternAfterDefault];
  const y = arrPatternSplat.slice(0);
  return y;
};
const tmpCalleeParam$2 = f('', 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
