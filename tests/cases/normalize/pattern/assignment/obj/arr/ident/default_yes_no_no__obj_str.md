# Preval test case

# default_yes_no_no__obj_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] } = { x: 'abc', a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var tmpTernaryTest;
objAssignPatternRhs = { x: 'abc', a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var tmpTernaryTest;
objAssignPatternRhs = { x: 'abc', a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
