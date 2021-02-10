# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) }) {
  return 'ok';
}
$(f({ b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 'pass' };
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
  return 'ok';
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = { b: 11, c: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '"pass"' }
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
