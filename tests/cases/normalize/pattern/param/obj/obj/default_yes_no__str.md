# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > obj > obj > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) }) {
  return 'ok';
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      tmpArg = { x: 'pass' };
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f('abc', 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'pass' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f('abc', 10);
$(tmpArg_1);
`````

## Result

Should call `$` with:
[[{ x: 'pass' }], "<crash[ Cannot destructure '$(...)' as it is undefined. ]>"];

Normalized calls: BAD?!
[[{ x: 'pass' }], ['ok'], null];

Final output calls: BAD!!
[[{ x: 'pass' }], ['ok'], null];

