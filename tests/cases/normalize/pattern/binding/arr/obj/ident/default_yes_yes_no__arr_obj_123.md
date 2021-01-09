# Preval test case

# default_yes_yes_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpArg;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
{
  let arrPatternStep;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      tmpArg = { x: 'fail2' };
      arrPatternStep = $(tmpArg);
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
}
const objPatternBeforeDefault = arrPatternStep.x;
{
  let x;
  {
    let ifTestTmp_1 = objPatternBeforeDefault === undefined;
    if (ifTestTmp_1) {
      x = $('fail');
    } else {
      x = objPatternBeforeDefault;
    }
  }
}
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = { x: 8, x: 8, x: 8 };
var x = [x, 8, 8];
var x = [...x];
var x = x[8];
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = { x: 'str' };
      x = x(x);
    } else {
      x = x;
    }
  }
}
var x = x.x;
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = x('str');
    } else {
      x = x;
    }
  }
}
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpArg;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { x: 'fail2' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x;
let ifTestTmp_1 = objPatternBeforeDefault === undefined;
if (ifTestTmp_1) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
