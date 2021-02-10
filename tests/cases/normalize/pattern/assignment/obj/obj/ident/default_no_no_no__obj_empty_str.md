# Preval test case

# default_no_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = { x: '', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: '', b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
