# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: [...y] = $(['fail']) } = tmpParamPattern;
  return 'bad';
};
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
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
  let y = arrPatternSplat.slice(0);
  return 'bad';
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(undefined, 10);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail'];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const arrPatternSplat = [...objPatternAfterDefault];
  arrPatternSplat.slice(0);
  return 'bad';
};
const tmpCalleeParam$1 = f(undefined, 10);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
