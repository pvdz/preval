# Preval test case

# default_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = [, , , 1];
$(x);
`````

## Pre Normal


`````js filename=intro
const [...x] = [, , , 1];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [, , , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## Output


`````js filename=intro
const arrPatternSplat = [undefined, undefined, undefined, 1];
const x = arrPatternSplat.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1 ];
const b = a.slice( 0 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
