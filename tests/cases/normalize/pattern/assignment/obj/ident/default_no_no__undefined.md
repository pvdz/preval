# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > ident > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
x = tmpAssignObjPatternRhs.x;
tmpAssignObjPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
x = undefined.x;
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
