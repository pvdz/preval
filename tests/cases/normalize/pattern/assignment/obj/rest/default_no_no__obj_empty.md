# Preval test case

# default_no_no__obj_empty.md

> normalize > pattern >  > param > obj > rest > default_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = {});
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = {};
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = {};
const tmpCalleeParam$1 = [];
x = objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, 'x');
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
