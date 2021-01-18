# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: { ...y },
  },
] = [{ x: { a: 1, b: 2, c: 3 }, y: 11 }, 10]);
$(y);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
y = objPatternRest(objPatternNoDefault, []);
arrAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
y = objPatternRest(objPatternNoDefault, []);
$(y);
`````

## Result

Should call `$` with:
[[{ a: 1, b: 2, c: 3 }], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

