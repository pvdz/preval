# Preval test case

# arr_obj.md

> Normalize > Pattern > Binding > Base no def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x }] = [{x: 100}];
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ x: x }] = [{ x: 100 }];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = { x: 100 };
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
