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

## Pre Normal


`````js filename=intro
const [[x]] = [[100]];
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
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope