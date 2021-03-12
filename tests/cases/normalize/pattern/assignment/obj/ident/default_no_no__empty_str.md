# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = '');
$(x);
`````

## Pre Normal

`````js filename=intro
({ x } = '');
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = '';
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
x = ''.x;
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
