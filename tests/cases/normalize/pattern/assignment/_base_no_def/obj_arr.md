# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base no def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10, y = 20;
({x: [ y ]} = 1)
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat[0];
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (1).x;
[...objPatternNoDefault][0];
`````

## Pre Normal


`````js filename=intro
let x = 10,
  y = 20;
({
  x: [y],
} = 1);
`````

## Normalized


`````js filename=intro
let x = 10;
let y = 20;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ...a ];
b[ 0 ];
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
