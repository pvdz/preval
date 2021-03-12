# Preval test case

# default_yes__obj_123.md

> Normalize > Pattern > Param > Obj > Default yes  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f({ a: 1, b: 2, c: 3 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let {} = tmpParamDefault === undefined ? $('fail') : tmpParamDefault;
  return 'ok';
};
$(f({ a: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = $('fail');
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { a: 1, b: 2, c: 3 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = $('fail');
  } else {
    bindingPatternObjRoot = tmpParamDefault;
  }
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
  }
  if (objPatternCrashTest) {
    bindingPatternObjRoot.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCalleeParam$1 = { a: 1, b: 2, c: 3 };
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
