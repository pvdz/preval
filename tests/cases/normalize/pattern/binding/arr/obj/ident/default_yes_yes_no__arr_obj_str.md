# Preval test case

# default_yes_yes_no__arr_obj_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: 'abc', y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpArg;
tmpElement = { x: 'abc', y: 2, z: 3 };
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

## Output

`````js filename=intro
var tmpElement;
var tmpArg;
tmpElement = { x: 'abc', y: 2, z: 3 };
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
