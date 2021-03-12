# Preval test case

# default_no__123.md

> Normalize > Pattern > Param > Obj > Default no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f(1, 2, 3, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = $tdz$__pattern_after_default === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = $tdz$__pattern_after_default.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  let objPatternCrashTest = tmpParamPattern === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = tmpParamPattern === null;
  }
  if (objPatternCrashTest) {
    tmpParamPattern.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCalleeParam = f(1, 2, 3, 10);
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
