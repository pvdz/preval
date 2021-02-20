# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base alias > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z: a}}} = 1)
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
