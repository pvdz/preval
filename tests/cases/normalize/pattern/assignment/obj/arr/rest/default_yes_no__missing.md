# Preval test case

# default_yes_no__missing.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] = $(['pass']) } = { a: 11, b: 12 });
$(y);
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
objAssignPatternRhs = { a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['pass'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
objAssignPatternRhs;
$(y);
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
objAssignPatternRhs = { a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['pass'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$(y);
`````

## Result

Should call `$` with:
 - 0: ["pass"]
 - 1: ["pass"]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
