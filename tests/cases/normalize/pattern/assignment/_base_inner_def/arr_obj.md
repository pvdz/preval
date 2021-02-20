# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
var x, a = 100;
([{ x = a }] = [{}]);
$(x, a);
`````

## Normalized

`````js filename=intro
var a;
var x;
a = 100;
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = objPatternBeforeDefault;
}
$(x, a);
`````

## Output

`````js filename=intro
var x;
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = 100;
} else {
  x = objPatternBeforeDefault;
}
$(x, 100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100, 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
