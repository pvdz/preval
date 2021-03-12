# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base alias > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z: a}}} = 1
`````

## Pre Normal

`````js filename=intro
const {
  x: {
    y: { z: a },
  },
} = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const a = objPatternNoDefault$1.z;
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
