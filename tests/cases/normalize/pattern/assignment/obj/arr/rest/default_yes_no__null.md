# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] = $(['fail']) } = null);
$('bad');
`````

## Normalized

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
objAssignPatternRhs = null;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['fail'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
objAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
objAssignPatternRhs = null;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['fail'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of null ]>

Normalized calls: Same

Final output calls: Same
