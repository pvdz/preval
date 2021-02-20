# Preval test case

# arr_arr.md

> Normalize > Pattern > Binding > Base no def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [[ x ]] = [[ 100 ]];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = [100];
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = [100];
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
