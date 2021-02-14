# Preval test case

# default_no_no__obj_0.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { x: 0 });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0 };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0 };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
