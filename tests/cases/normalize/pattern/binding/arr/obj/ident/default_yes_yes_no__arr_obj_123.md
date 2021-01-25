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
var tmpArg;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { x: 'fail2' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { x: 'fail2' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
