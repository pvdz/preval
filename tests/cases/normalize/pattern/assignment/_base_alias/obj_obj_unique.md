# Preval test case

# obj_obj_unique.md

> Normalize > Pattern > Assignment > Base alias > Obj obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
({x: {y: {z: a}}} = 1);
{ let a = 1; }
`````

## Normalized

`````js filename=intro
let a = 1;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
a$1 = objPatternNoDefault$1.z;
let a$2 = 1;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
a$1 = objPatternNoDefault$1.z;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
