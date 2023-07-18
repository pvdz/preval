# Preval test case

# obj_arr.md

> Normalize > Pattern > Binding > Base unique > Obj arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let y = 1; }
const {x: [ y ]} = 1;
{ let y = 1; }
`````

## Pre Normal

`````js filename=intro
{
  let y$1 = 1;
}
const {
  x: [y],
} = 1;
{
  let y$3 = 1;
}
`````

## Normalized

`````js filename=intro
let y$1 = 1;
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
let y$3 = 1;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ... a,, ];
b[ 0 ];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
