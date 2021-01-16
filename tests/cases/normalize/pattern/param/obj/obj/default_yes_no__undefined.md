# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > obj > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) }) {
  return 'bad';
}
$(f(undefined, 10));
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
        tmpArg = { x: 'fail' };
        objPatternAfterDefault = $(tmpArg);
      } else {
        objPatternAfterDefault = objPatternBeforeDefault;
      }
    }
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(undefined, 10);
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
    tmpArg = { x: 'fail' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(undefined, 10);
$(tmpArg_1);
`````
