# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base inner def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z = a }}} = 1;
`````

## Settled


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

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ((1).x.y.z === undefined) {
  a;
}
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

## PST Settled
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

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
