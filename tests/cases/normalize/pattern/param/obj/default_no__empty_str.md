# Preval test case

# default_no__empty_str.md

> Normalize > Pattern > Param > Obj > Default no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f('', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternCrashTest = tmpParamPattern === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = tmpParamPattern === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = tmpParamPattern.cannotDestructureThis;
  }
  return 'ok';
}
const tmpCallCallee = $;
const tmpCalleeParam = f('', 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternCrashTest = tmpParamPattern === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = tmpParamPattern === null;
  }
  if (objPatternCrashTest) {
    tmpParamPattern.cannotDestructureThis;
  }
  return 'ok';
}
const tmpCalleeParam = f('', 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
