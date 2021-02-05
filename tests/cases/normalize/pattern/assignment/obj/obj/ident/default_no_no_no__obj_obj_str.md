# Preval test case

# default_no_no_no__obj_obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = { x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 'abc', z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
tmpAssignObjPatternRhs;
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 'abc', z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
