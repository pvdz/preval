# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > obj > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) }) {
  return 'bad';
}
$(f());
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 'fail' };
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
  }
  return 'bad';
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 'fail' };
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
  }
  return 'bad';
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
