# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base unique > Obj arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let y = 1; }
({x: [ y ]} = 1);
{ let y = 1; }
`````

## Pre Normal


`````js filename=intro
{
  let y$3 = 1;
}
({
  x: [y],
} = 1);
{
  let y$1 = 1;
}
`````

## Normalized


`````js filename=intro
let y$3 = 1;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
let y$1 = 1;
`````

## Output


`````js filename=intro
const objPatternNoDefault = (1).x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ... a ];
y = b[ 0 ];
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
