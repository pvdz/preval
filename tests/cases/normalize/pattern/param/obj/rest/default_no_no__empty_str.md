# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f('', 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: 'fail' }) : tmpParamBare;
  return x;
};
$(f('', 10));
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
    const tmpCalleeParam = { a: 'fail' };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$5 = 'x';
  let x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  return x;
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$7 = f('', 10);
tmpCallCallee$3(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = [];
const x = objPatternRest('', tmpCalleeParam$3, 'x');
$(x);
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
