# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const a = 10;
([[ x = a ]] = [[]]);
$(a);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var tmpTernaryTest;
const a = 10;
arrAssignPatternRhs = [[]];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
arrAssignPatternRhs;
$(a);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var tmpTernaryTest;
arrAssignPatternRhs = [[]];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  x = 10;
} else {
  x = arrPatternBeforeDefault;
}
$(10);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
