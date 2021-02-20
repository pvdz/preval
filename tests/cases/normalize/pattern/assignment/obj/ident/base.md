# Preval test case

# base.md

> normalize > pattern >  > param > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, b: 2, c: 3 };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, b: 2, c: 3 };
x = tmpAssignObjPatternRhs.x;
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
