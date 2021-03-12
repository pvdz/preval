# Preval test case

# default_no__empty.md

> Normalize > Pattern > Param > Obj > Default no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'bad';
}
$(f());
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
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
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
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
