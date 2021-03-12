# Preval test case

# obj_arr.md

> Normalize > Pattern > Binding > Base no def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y ]} = 1
`````

## Pre Normal

`````js filename=intro
const {
  x: [y],
} = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
