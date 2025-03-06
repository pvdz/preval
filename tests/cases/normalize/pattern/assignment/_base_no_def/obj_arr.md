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

## Output


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat[0];
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ...a ];
b[ 0 ];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope