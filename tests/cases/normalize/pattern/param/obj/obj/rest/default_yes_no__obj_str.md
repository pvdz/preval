# Preval test case

# default_yes_no__obj_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return y;
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: 'fail' }) } = tmpParamBare;
  return y;
};
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 'fail' };
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = objPatternAfterDefault;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$5 = undefined;
  let y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  return y;
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$9 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$11 = 10;
const tmpCalleeParam$7 = tmpCallCallee$5(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$3(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const tmpCalleeParam$9 = { x: 'abc', b: 11, c: 12 };
const objPatternBeforeDefault = tmpCalleeParam$9.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: 'fail' };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
