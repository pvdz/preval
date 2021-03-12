# Preval test case

# default_yes_yes__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({}, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: { ...y } = $({ a: 'pass' }) } = tmpParamDefault === undefined ? $({ x: { a: 'fail2' } }) : tmpParamDefault;
  return y;
};
$(f({}, 10));
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
    const tmpCalleeParam$1 = { a: 'pass' };
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
const tmpCalleeParam$6 = {};
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: 'fail2' };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  const objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { a: 'pass' };
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCalleeParam$2 = objPatternAfterDefault;
  const tmpCalleeParam$3 = [];
  const y = objPatternRest(tmpCalleeParam$2, tmpCalleeParam$3, undefined);
  return y;
};
const tmpCalleeParam$6 = {};
const tmpCalleeParam$5 = f(tmpCalleeParam$6, 10);
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
