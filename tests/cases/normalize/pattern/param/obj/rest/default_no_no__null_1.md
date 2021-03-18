# Preval test case

# default_no_no__null_1.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  null 1
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x }) {
  return 'bad';
}
f(null);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { ...x } = tmpParamPattern;
  return 'bad';
};
f(null);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = bindingPatternObjRoot;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = 'x';
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return 'bad';
};
f(null);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = [];
objPatternRest(null, tmpCalleeParam$1, 'x');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
