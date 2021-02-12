# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > ident > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = null);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = null;
x = tmpAssignObjPatternRhs.x;
$('bad');
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = null;
x = tmpAssignObjPatternRhs.x;
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
