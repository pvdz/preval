# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'pass' })) {
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { ...x } = tmpParamDefault === undefined ? $({ a: 'pass' }) : tmpParamDefault;
  return x;
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
    const tmpCalleeParam = { a: 'pass' };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$2 = [];
  const tmpCalleeParam$3 = 'x';
  let x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
  return x;
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$4 = f();
tmpCallCallee$2(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 'pass' };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$2 = [];
  const x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$2, 'x');
  return x;
};
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
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
