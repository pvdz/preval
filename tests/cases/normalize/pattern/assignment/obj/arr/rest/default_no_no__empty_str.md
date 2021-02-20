# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] } = '');
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = '';
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = ''.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat.slice(0);
$('bad');
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
