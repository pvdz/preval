# Preval test case

# default_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = [];
$(x);
`````

## Pre Normal


`````js filename=intro
const [...x] = [];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## Output


`````js filename=intro
const arrPatternSplat = [];
const x = arrPatternSplat.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = a.slice( 0 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
