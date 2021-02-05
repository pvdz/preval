# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { x: undefined });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined };
x = tmpAssignObjPatternRhs.x;
tmpAssignObjPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
