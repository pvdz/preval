# Preval test case

# default_yes_yes_no__arr_obj_empty.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = [{}, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [{}, 20, 30];
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
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [{}, 20, 30];
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
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
