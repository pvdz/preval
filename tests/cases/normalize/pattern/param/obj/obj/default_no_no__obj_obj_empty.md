# Preval test case

# default_no_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'ok';
}
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
  }
  return 'ok';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = {};
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
