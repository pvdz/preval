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
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault$1.z;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  a;
} else {
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
