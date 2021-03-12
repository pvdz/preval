# Preval test case

# default_no_no__obj_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return y;
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: { ...y },
  } = tmpParamPattern;
  return y;
};
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return y;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$4 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const tmpCalleeParam$1 = [];
  const y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
  return y;
};
const tmpCalleeParam$4 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$3 = f(tmpCalleeParam$4, 10);
$(tmpCalleeParam$3);
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
