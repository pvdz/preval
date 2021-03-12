# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Obj > Arr > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: [],
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
  let arrPatternSplat = [...objPatternNoDefault];
  return 'bad';
};
const tmpCallCallee = $;
const tmpCalleeParam = f('abc', 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  [...objPatternNoDefault];
  return 'bad';
};
const tmpCalleeParam = f('abc', 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
