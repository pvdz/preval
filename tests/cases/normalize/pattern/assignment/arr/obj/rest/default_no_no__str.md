# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x }] = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = 'abc';
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
arrAssignPatternRhs = 'abc';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Result

Should call `$` with:
[[{ 0: 'a' }], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

