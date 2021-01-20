# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) }) {
  return y;
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
      tmpArg = { a: 'pass' };
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
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
    tmpArg = { a: 'pass' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_1;
tmpArg_1 = f('abc', 10);
$(tmpArg_1);
`````

## Result

Should call `$` with:
[[{ a: 'pass' }], "<crash[ Cannot destructure '$(...)' as it is undefined. ]>"];

Normalized calls: BAD?!
[[{ a: 'pass' }], '<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
[[{ a: 'pass' }], '<crash[ <ref> is not defined ]>'];

