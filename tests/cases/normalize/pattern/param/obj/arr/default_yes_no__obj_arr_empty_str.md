# Preval test case

# default_yes_no__obj_arr_empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Default yes no  obj arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f({ x: [''], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [] = $(['fail']) } = tmpParamBare;
  return 'ok';
};
$(f({ x: [''], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail'];
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpObjLitVal = [''];
const tmpCalleeParam$3 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
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
