# Preval test case

# default_yes__null.md

> Normalize > Pattern > Param > Obj > Default yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = $('fail');
  } else {
    $tdz$__pattern_after_default = tmpParamDefault;
  }
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
const tmpCalleeParam = f(null, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = $('fail');
  } else {
    $tdz$__pattern_after_default = tmpParamDefault;
  }
  let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = $tdz$__pattern_after_default === null;
  }
  if (objPatternCrashTest) {
    $tdz$__pattern_after_default.cannotDestructureThis;
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam = f(null, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
