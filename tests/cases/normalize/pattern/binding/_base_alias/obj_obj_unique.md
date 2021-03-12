# Preval test case

# obj_obj_unique.md

> Normalize > Pattern > Binding > Base alias > Obj obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
const {x: {y: {z: a}}} = 1
{ let a = 1; }
`````

## Pre Normal

`````js filename=intro
{
  let a$1 = 1;
}
const {
  x: {
    y: { z: a },
  },
} = 1;
{
  let a$2 = 1;
}
`````

## Normalized

`````js filename=intro
let a$1 = 1;
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const a = objPatternNoDefault$1.z;
let a$2 = 1;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
objPatternNoDefault$1.z;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
