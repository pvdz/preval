# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base inner def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z = a }}} = 1;
`````

## Pre Normal


`````js filename=intro
const {
  x: {
    y: { z: z = a },
  },
} = 1;
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault$1.z;
let z = undefined;
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
  a;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const b = 1.x;
const c = b.y;
const d = c.z;
const e = d === undefined;
if (e) {
  a;
}
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
