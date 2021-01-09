# Preval test case

# default_yes_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f({ x: 1, a: 2, b: 3 }, 10));
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
        tmpArg = ['fail'];
        objPatternAfterDefault = $(tmpArg);
      } else {
        objPatternAfterDefault = objPatternBeforeDefault;
      }
    }
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: 1, a: 2, b: 3 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x = x.x;
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = ['str'];
        x = x(x);
      } else {
        x = x;
      }
    }
  }
  var x = [...x];
  return 'str';
}
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: 1, a: 2, b: 3 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
