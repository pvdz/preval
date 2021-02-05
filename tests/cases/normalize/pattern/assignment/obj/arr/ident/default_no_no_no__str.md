# Preval test case

# default_no_no_no__str.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = 'abc');
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 'abc';
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
tmpAssignObjPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = 'abc'.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
