# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base inner def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z = a }}} = 1);
`````

## Pre Normal


`````js filename=intro
({
  x: {
    y: { z: z = a },
  },
} = 1);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault$1.z;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````

## Output


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault$1.z;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = a.y;
const c = b.z;
const d = c === undefined;
if (d) {
  z = a;
}
else {
  z = c;
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, z

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
