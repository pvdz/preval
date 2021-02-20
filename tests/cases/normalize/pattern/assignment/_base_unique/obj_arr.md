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

## Normalized

`````js filename=intro
let y = 1;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y$1 = arrPatternSplat[0];
let y$2 = 1;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const arrPatternSplat = [...objPatternNoDefault];
y$1 = arrPatternSplat[0];
`````

## Globals

BAD@! Found 1 implicit global bindings:

y$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
