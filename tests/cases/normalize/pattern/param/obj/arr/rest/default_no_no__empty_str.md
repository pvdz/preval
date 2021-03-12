# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] }) {
  return 'bad';
}
$(f('', 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: [...y],
  } = tmpParamPattern;
  return 'bad';
};
$(f('', 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat.slice(0);
  return 'bad';
};
const tmpCallCallee = $;
const tmpCalleeParam = f('', 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const arrPatternSplat = [...objPatternNoDefault];
  arrPatternSplat.slice(0);
  return 'bad';
};
const tmpCalleeParam = f('', 10);
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
