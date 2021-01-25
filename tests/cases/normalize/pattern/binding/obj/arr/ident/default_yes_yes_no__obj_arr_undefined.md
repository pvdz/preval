# Preval test case

# default_yes_yes_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] = $(['fail2']) } = { x: [undefined], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
tmpObjPropValue = [undefined];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['fail2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
tmpObjPropValue = [undefined];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['fail2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
