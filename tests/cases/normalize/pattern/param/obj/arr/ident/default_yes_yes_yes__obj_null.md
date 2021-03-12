# Preval test case

# default_yes_yes_yes__obj_null.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) } = $({ x: ['fail3'] })) {
  return 'bad';
}
$(f({ x: null, a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: [y = 'fail'] = $(['fail2']) } = tmpParamDefault === undefined ? $({ x: ['fail3'] }) : tmpParamDefault;
  return 'bad';
};
$(f({ x: null, a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = ['fail3'];
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
    const tmpCalleeParam$1 = ['fail2'];
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$2 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    y = 'fail';
    return 'bad';
  } else {
    y = arrPatternBeforeDefault;
    return 'bad';
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = { x: null, a: 11, b: 12 };
const tmpCalleeParam$4 = 10;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = ['fail3'];
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  const objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = ['fail2'];
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const arrPatternSplat = [...objPatternAfterDefault];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest$2 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam$3 = { x: null, a: 11, b: 12 };
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
