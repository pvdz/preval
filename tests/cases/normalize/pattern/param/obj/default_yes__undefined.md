# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Obj > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = $('pass');
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
const tmpCalleeParam = f(undefined, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = $('pass');
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
const tmpCalleeParam = f(undefined, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
