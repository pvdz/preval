# Preval test case

# default_no_no_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default no no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y] }) {
  return 'bad';
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return 'bad';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: undefined, a: 11, b: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const arrPatternSplat = [...objPatternNoDefault];
  arrPatternSplat[0];
  return 'bad';
};
const tmpCalleeParam$1 = { x: undefined, a: 11, b: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
