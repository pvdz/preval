# Preval test case

# obj.md

> Normalize > Pattern > Assignment > Base inner def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x = b } = 1);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x;
if (objPatternBeforeDefault === undefined) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Pre Normal


`````js filename=intro
({ x: x = b } = 1);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const c = a === undefined;
if (c) {
  x = b;
}
else {
  x = a;
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

b, x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
