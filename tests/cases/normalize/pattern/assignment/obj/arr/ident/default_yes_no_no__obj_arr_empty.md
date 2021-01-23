# Preval test case

# default_yes_no_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'pass'] } = { x: [], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var arrPatternBeforeDefault;
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpTernaryTest;
objAssignPatternRhs = { x: [], a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  y = 'pass';
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
var objPatternNoDefault;
var tmpTernaryTest;
objAssignPatternRhs = { x: [], a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
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
