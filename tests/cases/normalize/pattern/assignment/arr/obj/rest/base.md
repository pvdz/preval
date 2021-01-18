# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x }] = [{ x: 1, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = objPatternRest(arrPatternStep, []);
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Result

Should call `$` with:
[[{ x: 1, y: 2, z: 3 }], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

