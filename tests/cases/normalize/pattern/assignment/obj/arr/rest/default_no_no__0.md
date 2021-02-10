# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > arr > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] } = 0);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
