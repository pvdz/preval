# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: [ y = a ]} = 1);
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = arrPatternBeforeDefault;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (1).x;
const arrPatternBeforeDefault = [...objPatternNoDefault][0];
if (arrPatternBeforeDefault === undefined) {
  y = a;
} else {
  y = arrPatternBeforeDefault;
}
`````

## Pre Normal


`````js filename=intro
({
  x: [y = a],
} = 1);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = arrPatternBeforeDefault;
}
`````

## PST Settled
With rename=true

`````js filename=intro
const b = 1.x;
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  y = a;
}
else {
  y = d;
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope