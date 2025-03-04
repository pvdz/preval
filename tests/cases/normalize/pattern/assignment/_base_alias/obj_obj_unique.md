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

## Pre Normal


`````js filename=intro
{
  let a$3 = 1;
}
({
  x: {
    y: { z: a },
  },
} = 1);
{
  let a$1 = 1;
}
`````

## Normalized


`````js filename=intro
let a$3 = 1;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
let a$1 = 1;
`````

## Output


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
`````

## PST Output

With rename=true

`````js filename=intro
const b = 1.x;
const c = b.y;
a = c.z;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
