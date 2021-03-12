# Preval test case

# default_yes_yes_no__obj_arr_empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return y;
}
$(f({ x: [''], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: [y = 'fail'] = $(['fail2']) } = tmpParamPattern;
  return y;
};
$(f({ x: [''], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail2'];
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    y = 'fail';
    return y;
  } else {
    y = arrPatternBeforeDefault;
    return y;
  }
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpObjLitVal = [''];
const tmpCalleeParam$2 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail2'];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const arrPatternSplat = [...objPatternAfterDefault];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    return 'fail';
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpObjLitVal = [''];
const tmpCalleeParam$2 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$1 = f(tmpCalleeParam$2, 10);
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
