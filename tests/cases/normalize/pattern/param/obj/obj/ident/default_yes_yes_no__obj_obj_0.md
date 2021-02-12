# Preval test case

# default_yes_yes_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
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
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
  return y;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpObjLitVal = { x: 1, y: 0, z: 3 };
const tmpCalleeParam$2 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { y: 'fail2' };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
  return y;
}
const tmpCallCallee$2 = f;
const tmpObjLitVal = { x: 1, y: 0, z: 3 };
const tmpCalleeParam$2 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, 10);
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
