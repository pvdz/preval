# Preval test case

# default_no_no_no__obj_obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
