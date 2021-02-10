# Preval test case

# default_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { x: '' });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: '' };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
