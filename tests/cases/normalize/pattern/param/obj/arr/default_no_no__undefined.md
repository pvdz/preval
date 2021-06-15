# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Param > Obj > Arr > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [],
  } = tmpParamBare;
  return `bad`;
};
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  return `bad`;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
