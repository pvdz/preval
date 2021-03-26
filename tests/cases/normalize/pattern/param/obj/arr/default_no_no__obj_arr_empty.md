# Preval test case

# default_no_no__obj_arr_empty.md

> Normalize > Pattern > Param > Obj > Arr > Default no no  obj arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'ok';
}
$(f({ x: [], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [],
  } = tmpParamBare;
  return 'ok';
};
$(f({ x: [], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = [];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpCalleeParam$1.x;
[...objPatternNoDefault];
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
