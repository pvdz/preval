# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'pass2' } })) {
  return y;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: { ...y } = $({ a: 'fail' }) } = tmpParamDefault === undefined ? $({ x: { a: 'pass2' } }) : tmpParamDefault;
  return y;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = { a: 'pass2' };
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
const tmpCalleeParam$5 = f();
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: 'pass2' };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
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
  return y;
};
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"a":"\\"pass2\\""}' }
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
