# Preval test case

# default_yes_yes__obj_obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: { ...y } = $({ a: 'fail' }) } = tmpParamDefault === undefined ? $({ x: { a: 'fail2' } }) : tmpParamDefault;
  return y;
};
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = { a: 'fail2' };
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
    const tmpCalleeParam$1 = { a: 'fail' };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$2 = objPatternRest;
  const tmpCalleeParam$2 = objPatternAfterDefault;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$4 = undefined;
  let y = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
  return y;
};
const tmpCallCallee$3 = $;
const tmpCallCallee$4 = f;
const tmpObjLitVal$1 = {};
const tmpCalleeParam$6 = { x: tmpObjLitVal$1, b: 11, c: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = {};
const tmpCalleeParam$6 = { x: tmpObjLitVal$1, b: 11, c: 12 };
let bindingPatternObjRoot = undefined;
const tmpIfTest = tmpCalleeParam$6 === undefined;
if (tmpIfTest) {
  const tmpObjLitVal = { a: 'fail2' };
  const tmpCalleeParam = { x: tmpObjLitVal };
  bindingPatternObjRoot = $(tmpCalleeParam);
} else {
  bindingPatternObjRoot = tmpCalleeParam$6;
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
const tmpCalleeParam$2 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const y = objPatternRest(tmpCalleeParam$2, tmpCalleeParam$3, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
