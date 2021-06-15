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

## Pre Normal

`````js filename=intro
let x = 10;
[{ x: x }] = 1;
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
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
