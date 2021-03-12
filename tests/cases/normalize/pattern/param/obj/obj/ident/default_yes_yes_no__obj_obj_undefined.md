# Preval test case

# default_yes_yes_no__obj_obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: { y = $('pass') } = $({ y: 'fail2' }) } = tmpParamPattern;
  return y;
};
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
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
    const tmpCalleeParam = { y: 'fail2' };
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    y = $('pass');
    return y;
  } else {
    y = objPatternBeforeDefault$1;
    return y;
  }
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpObjLitVal = { x: 1, y: undefined, z: 3 };
const tmpCalleeParam$2 = { x: tmpObjLitVal, b: 11, c: 12 };
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
    const tmpCalleeParam = { y: 'fail2' };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    const SSA_y = $('pass');
    return SSA_y;
  } else {
    return objPatternBeforeDefault$1;
  }
};
const tmpObjLitVal = { x: 1, y: undefined, z: 3 };
const tmpCalleeParam$2 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$1 = f(tmpCalleeParam$2, 10);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
