# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base unique > Obj obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let z = 1; }
({x: {y: {z}}} = 1);
{ let z = 1; }
`````

## Pre Normal


`````js filename=intro
{
  let z$3 = 1;
}
({
  x: {
    y: { z: z },
  },
} = 1);
{
  let z$1 = 1;
}
`````

## Normalized


`````js filename=intro
let z$3 = 1;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
z = objPatternNoDefault$1.z;
let z$1 = 1;
`````

## Output


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
z = objPatternNoDefault$1.z;
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = a.y;
z = b.z;
`````

## Globals

BAD@! Found 1 implicit global bindings:

z

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
