# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: { ...y },
  } = tmpParamPattern;
  return 'bad';
};
$(f('abc', 10));
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
  return 'bad';
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f('abc', 10);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const tmpCalleeParam$1 = [];
  objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
  return 'bad';
};
const tmpCalleeParam$3 = f('abc', 10);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
