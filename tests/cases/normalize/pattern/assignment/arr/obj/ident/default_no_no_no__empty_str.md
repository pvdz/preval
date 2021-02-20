# Preval test case

# default_no_no_no__empty_str.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = '');
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = '';
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
