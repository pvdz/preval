# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return 'bad';
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$4 = { x: null, b: 11, c: 12 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
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
const tmpCalleeParam$4 = { x: null, b: 11, c: 12 };
const tmpCalleeParam$3 = f(tmpCalleeParam$4, 10);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
