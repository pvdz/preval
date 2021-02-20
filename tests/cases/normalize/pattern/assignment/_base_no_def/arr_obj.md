# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base no def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
([{ x }] = 1);
`````

## Normalized

`````js filename=intro
let x = 10;
const arrAssignPatternRhs = 1;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
const arrPatternStep = arrPatternSplat[0];
arrPatternStep.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
