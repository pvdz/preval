# Preval test case

# default_yes_yes_no__obj_arr_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['fail2']) } = { x: ['abc'], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var arrPatternBeforeDefault;
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var tmpArg;
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpObjPropValue = ['abc'];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['fail2'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest$1 = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
objAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
var arrPatternBeforeDefault;
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var tmpArg;
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpObjPropValue = ['abc'];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['fail2'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest$1 = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "abc"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
