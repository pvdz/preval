# Preval test case

# default_no_no__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Default no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'ok';
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: {},
  } = tmpParamPattern;
  return 'ok';
};
$(f({ x: '', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: '', b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternNoDefault.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCalleeParam$1 = { x: '', b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
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
