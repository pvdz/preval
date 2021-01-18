# Preval test case

# default_yes_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'pass2' }) }) {
  return y;
}
$(f({ b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  {
    let objPatternAfterDefault;
    {
      let ifTestTmp = objPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        tmpArg = { y: 'pass2' };
        objPatternAfterDefault = $(tmpArg);
      } else {
        objPatternAfterDefault = objPatternBeforeDefault;
      }
    }
  }
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  {
    let y;
    {
      let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
      if (ifTestTmp_1) {
        y = $('fail');
      } else {
        y = objPatternBeforeDefault_1;
      }
    }
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
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
    tmpArg = { y: 'pass2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  let y;
  let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault_1;
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Result

Should call `$` with:
[[{ y: 'pass2' }], "<crash[ Cannot read property 'y' of undefined ]>"];

Normalized calls: BAD?!
[[{ y: 'pass2' }], '<crash[ <ref> is not defined ]>'];

Final output calls: Same
