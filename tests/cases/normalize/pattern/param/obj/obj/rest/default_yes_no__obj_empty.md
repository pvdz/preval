# Preval test case

# default_yes_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) }) {
  return y;
}
$(f({}, 10));
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
    const tmpCalleeParam = { a: 'pass' };
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = objPatternAfterDefault;
  const tmpCalleeParam$2 = [];
  const tmpCalleeParam$3 = undefined;
  let y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
  return y;
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$5 = {};
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$2(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 'pass' };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCalleeParam$1 = objPatternAfterDefault;
  const tmpCalleeParam$2 = [];
  const y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$2, undefined);
  return y;
};
const tmpCalleeParam$5 = {};
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
