# Preval test case

# default_yes_yes__obj_obj_123.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: 'fail' }) } = tmpParamBare === undefined ? $({ x: { a: 'fail2' } }) : tmpParamBare;
  return y;
};
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = { a: 'fail2' };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$3 = objPatternRest;
  const tmpCalleeParam$3 = objPatternAfterDefault;
  const tmpCalleeParam$5 = [];
  const tmpCalleeParam$7 = undefined;
  let y = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  return y;
};
const tmpCallCallee$5 = $;
const tmpCallCallee$7 = f;
const tmpObjLitVal$1 = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$11 = { x: tmpObjLitVal$1, b: 11, c: 12 };
const tmpCalleeParam$13 = 10;
const tmpCalleeParam$9 = tmpCallCallee$7(tmpCalleeParam$11, tmpCalleeParam$13);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$11 = { x: tmpObjLitVal$1, b: 11, c: 12 };
let bindingPatternObjRoot = undefined;
const tmpIfTest = tmpCalleeParam$11 === undefined;
if (tmpIfTest) {
  const tmpObjLitVal = { a: 'fail2' };
  const tmpCalleeParam = { x: tmpObjLitVal };
  bindingPatternObjRoot = $(tmpCalleeParam);
} else {
  bindingPatternObjRoot = tmpCalleeParam$11;
}
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = { a: 'fail' };
  objPatternAfterDefault = $(tmpCalleeParam$1);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCalleeParam$5 = [];
const y = objPatternRest(objPatternAfterDefault, tmpCalleeParam$5, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
